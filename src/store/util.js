/* Use this when editing a simple value on the top level of the store node */
export function setValue(state = {}, changes = {}) {
  return {...state, ...changes};
}

/* Use this when editing one node in a list of nodes */
export function editNode(state = {}, key = "", changes = {}) {
  var updated = {...state}; //copy state for updates
  var node = updated[key];

  if (node) {
    /* Don't deep compare if target node is undefined */
    for (var change in changes) {
      /* Merge deep objects together rather than replace. Just replace Arrays */
      if (typeof changes[change] === "object") {
        if (!Array.isArray(changes[change])) {
          changes[change] = {...node[change], ...changes[change]};
        }
      }
    }
  }

  node = {...node, ...changes};
  updated[key] = node;

  return updated;
}

export function removeNode(state = {}, key = "") {
  var updated = {...state}; //copy state for removing
  if (updated[key]) {
    delete updated[key];
  }
  return updated;
}
