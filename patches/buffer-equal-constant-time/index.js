'use strict';
// Same API as buffer-equal-constant-time@1.0.1, minus its load-time access to
// buffer.SlowBuffer, which Node 25 removed (it crashed jsonwebtoken on import).
var Buffer = require('buffer').Buffer;
var crypto = require('crypto');

module.exports = bufferEq;

function bufferEq(a, b) {
  // Type and length checks leak nothing about the contents.
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

var origBufEqual = Buffer.prototype.equal;

bufferEq.install = function () {
  Buffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

bufferEq.restore = function () {
  Buffer.prototype.equal = origBufEqual;
};
