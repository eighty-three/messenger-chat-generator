# Messenger Chat Generator
A web app that can simulate conversations from Facebook Messenger 

Created 2020, removed commits due to credentials issue

## Install
```
git clone git@github.com:eighty-three/messenger-chat-generator.git
cd messenger-chat-generator
npm ci
npm run build
npm start //Port 3001, change at index.js
```

## Usage
**Messages**
![Usage](/docs/usage.gif)
**DP Controls**
![DP Controls](/docs/dp.gif)
**Deleting**
![Delete](/docs/delete.gif)

### Terms
* __Bubble__  
![Bubble](/docs/t_bubble.png)
* __Message__  
![Message](/docs/t_message.png)
* __Conversation__  
![Conversation](/docs/t_conversation.png)

### Instructions
* **CREATE**
  * **Create Message** - creates a message either from a *Friend* (defaults to *Default*) or from you
  * **Add Bubble** - adds a bubble to the most recent message
  * **Create Timestamp** - creates a timestamp
* **DELETE**
  * **Delete Bubble** - deletes the last bubble from the latest message
  * **Delete Item** - deletes the last item in the conversation, either a message or a timestamp
  * **Delete Conversation** - deletes everything in the conversation
* **DP CONTROLS**
  * **Toggle** - toggles the controls
  * **Remove All DP** - removes all currently used *Display Picture* in the conversation and puts them back in the *DP List*
  * **Append All DP** - appends every *Display Picture* into the last message
  * **Refresh List From Current Messages** - removes all currently used *Display Picture* in the conversation and puts them back in the *DP List*, and then deletes every *Display Picture* in the *DP List* that is currently not in the conversation. Using **Refresh List** will add back any *Display Picture* not in the *DP List* (that is, previously deleted by **Refresh List**) if the sender with the corresponding *Display Picture* is in the conversation
* **FRIENDS**
  * **Add Friend** - allows you to upload images from your local files to use as a display picture for the message
  * **Delete Friend** - deletes the selected *Friend* in the *Friends List*. It will delete the last item if *Default* is selected
* **IMAGES**
  * **Upload Images** - allows you to upload images from your local files to include in your messages
  * **Unselect Image** - unselects the image selected in the *Images List*
  * **Delete Image** - deletes the selected image in the *Images List*. It will delete the last item if there is nothing selected
* **SAVE**
  * **Save** - sets the whole conversation to an image that is downloaded to your device

### Misc
* **Create Message** won't do anything if the last message is from the same person (via the ID generated when using **Add Friend**, or if it's from yourself), unless there's a timestamp in between
* **Add Bubble** won't do anything if the last item is a timestamp
* **Delete Friend** won't delete the _Default_
* The images are uploaded from your local files; you cannot use external links for images
* Selecting an image in the _Images List_ then using **Create Message** or **Add Bubble** attaches the image to the conversation. It unselects the image after you use it
* An **Unselect Image** function is included because the images are an `input[radio]` and I opted for an **Unselect Image** function instead of hacking checkboxes.
* **Save** doesn't work if total filesize of the content is too large. If it's (roughly) at 13000 characters or if the images attached add up to ~8MB (or a combination of the two), using **Save** won't do anything

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
```

The structure is similar when using `createMessageSelf` except it has no `messageSender` (your name isn't seen) and `dpContainer` (you can't see your own photo in your messages).

When you use `addBubble`, the bubble inside `lastBubbleContainer` is appended to `extraBubblesContainer`, and then it creates a new bubble which is appended to `lastBubbleContainer`:

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
1. The message it is added to (`js-message--other` or `js-message--self`)
2. Where the bubble is located (`js-extra-bubbles-container` or `js-last-bubble-container`)
3. Whether it's an image or not

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
`drag` event listeners are attached to the last bubble in a message.
Only images from **DP Controls** are allowed
```javascript
  // /src/js/rightDP/dragEvents.js
  let dp = document.getElementById(e.dataTransfer.getData('text'));
  if (dp && dp.classList.contains('js-dp-from-list')) {
  ...
```
The toggle is not only to show/hide the controls, it also removes the event listeners to prevent unwanted behavior like showing the dropzone indicator. When it is toggled on, however, the visual behavior would work (highlighting the whole container to indicate dropzone) but the drop itself wouldn't because the dragged item needs a class `js-dp-from-list`
```javascript
  // /src/js/rightDP/controls.js
  Array.from(document.getElementsByClassName('js-message__container')).forEach((el) => {
    el.removeEventListener('dragover', dragOver);
    el.removeEventListener('dragenter', dragEnter);
    el.removeEventListener('dragleave', dragLeave);
    el.removeEventListener('drop', dragDrop);
  });
```
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

