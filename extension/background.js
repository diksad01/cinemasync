// SomniWatch Background Service Worker
// Handles storage and message passing between popup and content script

// Clear stale sessions on install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear();
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_SESSION') {
    chrome.storage.local.get(['roomCode', 'userName', 'userColor', 'serverUrl'], (data) => {
      sendResponse(data);
    });
    return true; // async
  }

  if (msg.type === 'SAVE_SESSION') {
    chrome.storage.local.set(msg.data, () => sendResponse({ ok: true }));
    return true;
  }

  if (msg.type === 'CLEAR_SESSION') {
    chrome.storage.local.remove(['roomCode', 'userName', 'userColor'], () => sendResponse({ ok: true }));
    return true;
  }

  // Forward sync events from content script to popup (for status display)
  if (msg.type === 'SYNC_STATUS') {
    chrome.runtime.sendMessage(msg).catch(() => {});
  }
});
