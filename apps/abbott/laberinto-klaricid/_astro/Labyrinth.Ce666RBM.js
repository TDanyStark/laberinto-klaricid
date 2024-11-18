import{r as p}from"./index.DhYZZe0J.js";var f={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=p,x=Symbol.for("react.element"),a=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,m=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function _(t,r,u){var e,n={},i=null,l=null;u!==void 0&&(i=""+u),r.key!==void 0&&(i=""+r.key),r.ref!==void 0&&(l=r.ref);for(e in r)d.call(r,e)&&!y.hasOwnProperty(e)&&(n[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:x,type:t,key:i,ref:l,props:n,_owner:m.current}}s.Fragment=a;s.jsx=_;s.jsxs=_;f.exports=s;var o=f.exports;const v=()=>{const[t,r]=p.useState(0);return o.jsxs("div",{children:[o.jsx("h1",{children:"Labyrinth"}),o.jsxs("h2",{children:["Counter: ",t]}),o.jsx("button",{onClick:()=>r(t+1),children:"Increment"})]})};export{v as default};
