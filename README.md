# Messenger Chat Generator
A web application to generate a conversation in Messenger

## Install
```
git clone git@github.com:eighty-three/messenger-chat-generator.git
cd messenger-chat-generator
npm ci
npm start //Port 3001, change at index.js
```

## Usage
![Usage](/docs/usage.gif)

### Terms
* __Bubble__  
![Bubble](/docs/t_bubble.png)
* __Message__  
![Message](/docs/t_message.png)
* __Conversation__  
![Conversation](/docs/t_conversation.png)

### Instructions
* **Create Message** - creates a message either from a *Friend* (defaults to *Default*) or from you
* **Add Bubble** - adds a bubble to the most recent message
* **Create Timestamp** - creates a timestamp
* **Delete** - deletes the last item in the conversation, either a message or a timestamp. It deletes the whole message, not just the last bubble inside a message
* **Delete All** - deletes everything in the conversation
* **Add Friend** - allows you to upload images from your local files to use as a display picture for the message
* **Delete Friend** - deletes the selected *Friend* in the *Friends List*. It will delete the last item if *Default* is selected
* **Upload Images** - allows you to upload images from your local files to include in your messages
* **Unselect Image** - unselects the image selected in the *Images List*
* **Delete Image** - deletes the selected image in the *Images List*. It will delete the last item if there is nothing selected
* **Save** - sets the whole conversation to an image that is downloaded to your device

### Misc
* **Create Message** won't do anything if the last message is from the same person (via the ID generated when using **Add Friend**, or if it's from yourself), unless there's a timestamp in between
* **Add Bubble** won't do anything if the last item is a timestamp
* **Delete Friend** won't delete the _Default_
* The images are uploaded from your local files; you cannot use external links for images
* Selecting an image in the _Images List_ then using **Create Message** or **Add Bubble** attaches the image to the conversation. It unselects the image after you use it
* An **Unselect Image** function is included because the images are an `input[radio]` and I opted for an **Unselect Image** function instead of hacking checkboxes.

## Technical Documentation
A (short) explanation of some important details

### Message Structure
```javascript
//Removed irrelevant parts

//createMessageOther in createMessage.js
let newMessage = document.createElement('div');
let extraBubblesContainer = document.createElement('div');
let lastBubbleContainer = document.createElement('div');
let messageSender = document.createElement('div');
let dpContainer = dpSource.cloneNode(true);
let newBubble;
...
newBubble = document.createElement('div');

messagesContainer.append(newMessage);
newMessage.append(messageSender, extraBubblesContainer, lastBubbleContainer);
lastBubbleContainer.append(dpContainer, newBubble);
createRightDp();

//createRightDp in bubblesHelper.js
messagesContainer.lastElementChild.append(rightDPContainer); 
```

The structure is almost the exact same when using `createMessageSelf` except it has no `messageSender` (your name isn't seen) and `dpContainer` (you can't see your own photo in your messages).

When you use `addBubble`, it determines what type the last message was (`other` or `self`) before adding a new bubble. What happens is that the last bubble inside `lastBubbleContainer` is appended to `extraBubblesContainer`, and then it creates a new bubble which it then appends to `lastBubbleContainer`:

```javascript
let latestMessage = messagesContainer.lastElementChild;
let extraBubblesContainer = latestMessage.querySelector('.js-extra-bubbles-container');
let lastBubbleContainer = latestMessage.querySelector('.js-last-bubble-container'); 
let lastBubble = lastBubbleContainer.lastElementChild; 
let newBubble;
...
newBubble = document.createElement('div');
extraBubblesContainer.append(lastBubble);
lastBubbleContainer.append(newBubble);
```

The `classList` (styling) of each new bubble to be added depends on:
1. The message it is added to
2. If it's an image or not
3. If there's a bubble in `extraBubblesContainer`, that is, it isn't the first bubble to be added using `addBubble`

### Sender ID
When using **Add Friend**, an ID (more specifically, a unique class name that acts as a JavaScript hook) for the image is generated where the messages will source their display pictures from. The ID used is created not with some unique ID generator like `shortid` but using a simple counter `counters.presetId` ("Preset" is the word used in code instead of "Friend") initially set at zero.

```javascript
//constants.js
const counters = { ..., 'presetId': 0}

//addPreset in presets.js
newImage.className = `js-${counters.presetId}`;
...
counters.presetId++;
```

If you use **Delete Friend**, the friend will be removed from the **Friends List** but their display picture will remain in the whole conversation including the display pictures on the right side (For "seen"). The total presets count would decrease too with `counters.totalPresets--` at the end of the function, which would cause issues if `counters.totalPresets` was used as a counter for the ID instead of something separate:

```javascript
addPreset()
//First new preset has js-1 class, counters.totalPresets is at 2 
deletePreset()
//counters.totalPresets is back to 1
addPreset()
//Second new preset also has js-1 class, counters.totalPresets is at 2
```

### "Seen" Display Pictures
The ID for the image is a `class` instead of an `id` because when creating a preset, it creates two copies of the same image used. The first one is appended to the `presetCompressed` element, while the other is appended to `presetImages`:
```javascript
let presetCompressed = document.createElement('div');
...
let newImage = document.createElement('img');
newImage.src = URL.createObjectURL(fileUploads[i]);
newImage.className = `js-${counters.presetId}`;

let newImageCompressed = newImage.cloneNode(true);
...
presetImages.append(newImage);
presetCompressed.append(newImageCompressed, name);
```

In the `createMessageOther` function, it gets the display picture it will display by getting the image under the selected radio. It also adds the first class of the image, the ID, and pushes it to `displayPictures.list` to be used for the _"Seen" Display Pictures_.

```javascript
//createMessageOther in createMessage.js
let dpSource = document.querySelector('input[name="presetSelect"]:checked ~ .js-preset-compressed > img');
let dpCurrent = dpSource.classList[0];
...
displayPictures.list.push(dpCurrent);

//createRightDp in bubblesHelper.js
let dpSource = document.querySelector(`.${displayPictures.list[i]}`);
let rightDP = dpSource.cloneNode(true);
```

In summary:
1. The `createMessageOther` function in `createMessage.js` chooses what display picture to use via the image under the selected preset (radio)
2. It pushes the first class of the image, the ID, to `displayPictures.list`
3. In the `createRightDp` function in `bubblesHelper.js`, it creates each display picture by cloning the element with the class `js-${presetId}`.

This separate container for the images is relevant because if you delete the preset (via **Delete Friend**), the image gets deleted too. If the display pictures are sourced solely through the ones in the preset container, it obviously won't persist after **Delete Friend**. However, if the _Friend_ is still in the conversation, his display picture should still be included in the _"Seen" Display Pictures_.

### Images
When using **Upload Images**, similar to **Add Friend**, you can only select files from your device.

```html
//index.html
<input type='file' class='js-image-upload c-images__upload' multiple accept='image/*'>
```
```javascript
//addImages in uploadImages.js
let fileUploads = imageUpload.files;
...
let newImage = document.createElement('img');
newImage.src = URL.createObjectURL(fileUploads[i]);
```

### Saving
[dom-to-image](https://github.com/tsayen/dom-to-image)
> dom-to-image is a library which can turn arbitrary DOM node into a vector (SVG) or raster (PNG or JPEG) image, written in JavaScript. It's based on domvas by Paul Bakaus and has been completely rewritten, with some bugs fixed and some new features (like web font and image support) added.

