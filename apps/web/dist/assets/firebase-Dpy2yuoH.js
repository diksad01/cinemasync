var jo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Uu=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],l=n[t++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},ac={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,g=o>>2,w=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,C=f&63;h||(C=64,a||(R=64)),r.push(t[g],t[w],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(oc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Uu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const w=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||w==null)throw new Bu;const R=o<<2|l>>4;if(r.push(R),f!==64){const C=l<<4&240|f>>2;if(r.push(C),w!==64){const k=f<<6&192|w;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};let Bu=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}};const $u=function(n){const e=oc(n);return ac.encodeByteArray(e,!0)},cc=function(n){return $u(n).replace(/\./g,"")},ju=function(n){try{return ac.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=()=>qu().__FIREBASE_DEFAULTS__,Wu=()=>{if(typeof process>"u"||typeof jo>"u")return;const n=jo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},zu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ju(n[1]);return e&&JSON.parse(e)},Gu=()=>{try{return Hu()||Wu()||zu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},lc=()=>{var n;return(n=Gu())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}function Qu(){try{return typeof indexedDB=="object"}catch{return!1}}function Ju(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="FirebaseError";let ri=class uc extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Yu,Object.setPrototypeOf(this,uc.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hc.prototype.create)}},hc=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Xu(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ri(s,l,r)}};function Xu(n,e){return n.replace(Zu,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Zu=/\{\$([^}]+)}/g;function Ds(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if(qo(o)&&qo(a)){if(!Ds(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function qo(n){return n!==null&&typeof n=="object"}let Tr=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ku;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nh(e))try{this.getOrInitializeService({instanceIdentifier:_t})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=_t){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_t){return this.instances.has(e)}getOptions(e=_t){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:th(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_t){return this.component?this.component.multipleInstances?e:_t:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function th(n){return n===_t?void 0:n}function nh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new eh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));const sh={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},ih=J.INFO,oh={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},ah=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=oh[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};let ch=class{constructor(e){this.name=e,this._logLevel=ih,this._logHandler=ah,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}};const lh=(n,e)=>e.some(t=>n instanceof t);let Ho,Wo;function uh(){return Ho||(Ho=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hh(){return Wo||(Wo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const dc=new WeakMap,Ns=new WeakMap,fc=new WeakMap,Es=new WeakMap,si=new WeakMap;function dh(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(it(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&dc.set(t,n)}).catch(()=>{}),si.set(e,n),e}function fh(n){if(Ns.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ns.set(n,e)}let Os={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ns.get(n);if(e==="objectStoreNames")return n.objectStoreNames||fc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return it(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ph(n){Os=n(Os)}function gh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(vs(this),e,...t);return fc.set(r,e.sort?e.sort():[e]),it(r)}:hh().includes(n)?function(...e){return n.apply(vs(this),e),it(dc.get(this))}:function(...e){return it(n.apply(vs(this),e))}}function mh(n){return typeof n=="function"?gh(n):(n instanceof IDBTransaction&&fh(n),lh(n,uh())?new Proxy(n,Os):n)}function it(n){if(n instanceof IDBRequest)return dh(n);if(Es.has(n))return Es.get(n);const e=mh(n);return e!==n&&(Es.set(n,e),si.set(e,n)),e}const vs=n=>si.get(n);function _h(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),l=it(a);return r&&a.addEventListener("upgradeneeded",h=>{r(it(a.result),h.oldVersion,h.newVersion,it(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const yh=["get","getKey","getAll","getAllKeys","count"],Eh=["put","add","delete","clear"],Ts=new Map;function zo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ts.get(e))return Ts.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Eh.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||yh.includes(t)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[t](...l),s&&h.done]))[0]};return Ts.set(e,o),o}ph(n=>({...n,get:(e,t,r)=>zo(e,t)||n.get(e,t,r),has:(e,t)=>!!zo(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Th(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Th(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Vs="@firebase/app",Go="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He=new ch("@firebase/app"),Ih="@firebase/app-compat",wh="@firebase/analytics-compat",Ah="@firebase/analytics",Rh="@firebase/app-check-compat",Sh="@firebase/app-check",Ch="@firebase/auth",Ph="@firebase/auth-compat",bh="@firebase/database",kh="@firebase/data-connect",Dh="@firebase/database-compat",Nh="@firebase/functions",Oh="@firebase/functions-compat",Vh="@firebase/installations",Lh="@firebase/installations-compat",Mh="@firebase/messaging",Fh="@firebase/messaging-compat",xh="@firebase/performance",Uh="@firebase/performance-compat",Bh="@firebase/remote-config",$h="@firebase/remote-config-compat",jh="@firebase/storage",qh="@firebase/storage-compat",Hh="@firebase/firestore",Wh="@firebase/vertexai-preview",zh="@firebase/firestore-compat",Gh="firebase",Kh="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="[DEFAULT]",Qh={[Vs]:"fire-core",[Ih]:"fire-core-compat",[Ah]:"fire-analytics",[wh]:"fire-analytics-compat",[Sh]:"fire-app-check",[Rh]:"fire-app-check-compat",[Ch]:"fire-auth",[Ph]:"fire-auth-compat",[bh]:"fire-rtdb",[kh]:"fire-data-connect",[Dh]:"fire-rtdb-compat",[Nh]:"fire-fn",[Oh]:"fire-fn-compat",[Vh]:"fire-iid",[Lh]:"fire-iid-compat",[Mh]:"fire-fcm",[Fh]:"fire-fcm-compat",[xh]:"fire-perf",[Uh]:"fire-perf-compat",[Bh]:"fire-rc",[$h]:"fire-rc-compat",[jh]:"fire-gcs",[qh]:"fire-gcs-compat",[Hh]:"fire-fst",[zh]:"fire-fst-compat",[Wh]:"fire-vertex","fire-js":"fire-js",[Gh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=new Map,Jh=new Map,Ms=new Map;function Ko(n,e){try{n.container.addComponent(e)}catch(t){He.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Bt(n){const e=n.name;if(Ms.has(e))return He.debug(`There were multiple attempts to register component ${e}.`),!1;Ms.set(e,n);for(const t of Ir.values())Ko(t,n);for(const t of Jh.values())Ko(t,n);return!0}function ii(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Pe(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ot=new hc("app","Firebase",Yh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt=Kh;function Zh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ls,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ot.create("bad-app-name",{appName:String(s)});if(t||(t=lc()),!t)throw ot.create("no-options");const o=Ir.get(s);if(o){if(Ds(t,o.options)&&Ds(r,o.config))return o;throw ot.create("duplicate-app",{appName:s})}const a=new rh(s);for(const h of Ms.values())a.addComponent(h);const l=new Xh(t,r,a);return Ir.set(s,l),l}function pc(n=Ls){const e=Ir.get(n);if(!e&&n===Ls&&lc())return Zh();if(!e)throw ot.create("no-app",{appName:n});return e}function at(n,e,t){var r;let s=(r=Qh[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const l=[`Unable to register library "${s}" with version "${e}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),He.warn(l.join(" "));return}Bt(new Tr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="firebase-heartbeat-database",td=1,Pn="firebase-heartbeat-store";let Is=null;function gc(){return Is||(Is=_h(ed,td,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Pn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ot.create("idb-open",{originalErrorMessage:n.message})})),Is}async function nd(n){try{const t=(await gc()).transaction(Pn),r=await t.objectStore(Pn).get(mc(n));return await t.done,r}catch(e){if(e instanceof ri)He.warn(e.message);else{const t=ot.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});He.warn(t.message)}}}async function Qo(n,e){try{const r=(await gc()).transaction(Pn,"readwrite");await r.objectStore(Pn).put(e,mc(n)),await r.done}catch(t){if(t instanceof ri)He.warn(t.message);else{const r=ot.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});He.warn(r.message)}}}function mc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=1024,sd=30*24*60*60*1e3;class id{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ad(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Jo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=sd}),this._storage.overwrite(this._heartbeatsCache))}catch(r){He.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Jo(),{heartbeatsToSend:r,unsentEntries:s}=od(this._heartbeatsCache.heartbeats),o=cc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return He.warn(t),""}}}function Jo(){return new Date().toISOString().substring(0,10)}function od(n,e=rd){const t=[];let r=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Yo(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Yo(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ad{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qu()?Ju().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await nd(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Qo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Qo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yo(n){return cc(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n){Bt(new Tr("platform-logger",e=>new vh(e),"PRIVATE")),Bt(new Tr("heartbeat",e=>new id(e),"PRIVATE")),at(Vs,Go,n),at(Vs,Go,"esm2017"),at("fire-js","")}cd("");var Xo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ld=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ud=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],l=n[t++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},hd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,g=o>>2,w=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,C=f&63;h||(C=64,a||(R=64)),r.push(t[g],t[w],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ld(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ud(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const w=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||w==null)throw new dd;const R=o<<2|l>>4;if(r.push(R),f!==64){const C=l<<4&240|f>>2;if(r.push(C),w!==64){const k=f<<6&192|w;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};let dd=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}};const _c=function(n){try{return hd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=()=>fd().__FIREBASE_DEFAULTS__,gd=()=>{if(typeof process>"u"||typeof Xo>"u")return;const n=Xo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},md=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_c(n[1]);return e&&JSON.parse(e)},yc=()=>{try{return pd()||gd()||md()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},_d=n=>{var e,t;return(t=(e=yc())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ec=n=>{var e;return(e=yc())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function yd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function Ed(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Td(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Id(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="FirebaseError";let Vr=class vc extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=wd,Object.setPrototypeOf(this,vc.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Lr.prototype.create)}},Lr=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Ad(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Vr(s,l,r)}};function Ad(n,e){return n.replace(Rd,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Rd=/\{\$([^}]+)}/g;function Sd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tc(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if(Zo(o)&&Zo(a)){if(!Tc(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Zo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function yn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,o]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function En(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Cd(n,e){const t=new Pd(n,e);return t.subscribe.bind(t)}class Pd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");bd(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ws),s.error===void 0&&(s.error=ws),s.complete===void 0&&(s.complete=ws);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ws(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const kd={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},Dd=z.INFO,Nd={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},Od=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Nd[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};let Vd=class{constructor(e){this.name=e,this._logLevel=Dd,this._logHandler=Od,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}};function oi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}let ea=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};function Ic(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ld=Ic,wc=new Lr("auth","Firebase",Ic());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr=new Vd("@firebase/auth");function Md(n,...e){wr.logLevel<=z.WARN&&wr.warn(`Auth (${Kt}): ${n}`,...e)}function pr(n,...e){wr.logLevel<=z.ERROR&&wr.error(`Auth (${Kt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,...e){throw ci(n,...e)}function be(n,...e){return ci(n,...e)}function ai(n,e,t){const r=Object.assign(Object.assign({},Ld()),{[e]:t});return new Lr("auth","Firebase",r).create(e,{appName:n.name})}function je(n){return ai(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fd(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Se(n,"argument-error"),ai(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ci(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return wc.create(n,...e)}function L(n,e,...t){if(!n)throw ci(e,...t)}function Ue(n){const e="INTERNAL ASSERTION FAILED: "+n;throw pr(e),new Error(e)}function We(n,e){n||Ue(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function xd(){return ta()==="http:"||ta()==="https:"}function ta(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xd()||vd()||"connection"in navigator)?navigator.onLine:!0}function Bd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e,t){this.shortDelay=e,this.longDelay=t,We(t>e,"Short delay should be less than long delay!"),this.isMobile=yd()||Td()}get(){return Ud()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(n,e){We(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=new Mn(3e4,6e4);function ht(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ge(n,e,t,r,s={}){return Rc(n,s,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const l=Ln(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return Ed()||(f.referrerPolicy="no-referrer"),Ac.fetch()(Sc(n,n.config.apiHost,t,l),f)})}async function Rc(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},$d),e);try{const s=new Hd(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw lr(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const l=o.ok?a.errorMessage:a.error.message,[h,f]=l.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw lr(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw lr(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw lr(n,"user-disabled",a);const g=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw ai(n,g,f);Se(n,g)}}catch(s){if(s instanceof Vr)throw s;Se(n,"network-request-failed",{message:String(s)})}}async function Fn(n,e,t,r,s={}){const o=await Ge(n,e,t,r,s);return"mfaPendingCredential"in o&&Se(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Sc(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?li(n.config,s):`${n.config.apiScheme}://${s}`}function qd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Hd{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(be(this.auth,"network-request-failed")),jd.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function lr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=be(n,e,r);return s.customData._tokenResponse=t,s}function na(n){return n!==void 0&&n.enterprise!==void 0}class Wd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return qd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function zd(n,e){return Ge(n,"GET","/v2/recaptchaConfig",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gd(n,e){return Ge(n,"POST","/v1/accounts:delete",e)}async function Cc(n,e){return Ge(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Kd(n,e=!1){const t=ke(n),r=await t.getIdToken(e),s=ui(r);L(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:wn(As(s.auth_time)),issuedAtTime:wn(As(s.iat)),expirationTime:wn(As(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function As(n){return Number(n)*1e3}function ui(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return pr("JWT malformed, contained fewer than 3 sections"),null;try{const s=_c(t);return s?JSON.parse(s):(pr("Failed to decode base64 JWT payload"),null)}catch(s){return pr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ra(n){const e=ui(n);return L(e,"internal-error"),L(typeof e.exp<"u","internal-error"),L(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Vr&&Qd(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Qd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=wn(this.lastLoginAt),this.creationTime=wn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar(n){var e;const t=n.auth,r=await n.getIdToken(),s=await $t(n,Cc(t,{idToken:r}));L(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Pc(o.providerUserInfo):[],l=Xd(n.providerData,a),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(l!=null&&l.length),g=h?f:!1,w={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new xs(o.createdAt,o.lastLoginAt),isAnonymous:g};Object.assign(n,w)}async function Yd(n){const e=ke(n);await Ar(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xd(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Pc(n){return n.map(e=>{var{providerId:t}=e,r=oi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zd(n,e){const t=await Rc(n,{},async()=>{const r=Ln({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=Sc(n,s,"/v1/token",`key=${o}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Ac.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ef(n,e){return Ge(n,"POST","/v2/accounts:revokeToken",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken<"u","internal-error"),L(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ra(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=ra(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await Zd(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,a=new Lt;return r&&(L(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(L(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(L(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Lt,this.toJSON())}_performRefresh(){return Ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n,e){L(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Be{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=oi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Jd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new xs(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await $t(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Kd(this,e)}reload(){return Yd(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Be(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ar(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pe(this.auth.app))return Promise.reject(je(this.auth));const e=await this.getIdToken();return await $t(this,Gd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,a,l,h,f,g;const w=(r=t.displayName)!==null&&r!==void 0?r:void 0,R=(s=t.email)!==null&&s!==void 0?s:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,M=(l=t.tenantId)!==null&&l!==void 0?l:void 0,N=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,Y=(f=t.createdAt)!==null&&f!==void 0?f:void 0,K=(g=t.lastLoginAt)!==null&&g!==void 0?g:void 0,{uid:G,emailVerified:te,isAnonymous:Re,providerData:ne,stsTokenManager:E}=t;L(G&&E,e,"internal-error");const p=Lt.fromJSON(this.name,E);L(typeof G=="string",e,"internal-error"),Xe(w,e.name),Xe(R,e.name),L(typeof te=="boolean",e,"internal-error"),L(typeof Re=="boolean",e,"internal-error"),Xe(C,e.name),Xe(k,e.name),Xe(M,e.name),Xe(N,e.name),Xe(Y,e.name),Xe(K,e.name);const _=new Be({uid:G,auth:e,email:R,emailVerified:te,displayName:w,isAnonymous:Re,photoURL:k,phoneNumber:C,tenantId:M,stsTokenManager:p,createdAt:Y,lastLoginAt:K});return ne&&Array.isArray(ne)&&(_.providerData=ne.map(y=>Object.assign({},y))),N&&(_._redirectEventId=N),_}static async _fromIdTokenResponse(e,t,r=!1){const s=new Lt;s.updateFromServerResponse(t);const o=new Be({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ar(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];L(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Pc(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),l=new Lt;l.updateFromIdToken(r);const h=new Be({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new xs(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=new Map;function $e(n){We(n instanceof Function,"Expected a class definition");let e=sa.get(n);return e?(We(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,sa.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}bc.type="NONE";const ia=bc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n,e,t){return`firebase:${n}:${e}:${t}`}class Mt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=gr(this.userKey,s.apiKey,o),this.fullPersistenceKey=gr("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Be._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mt($e(ia),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=s[0]||$e(ia);const a=gr(r,e.config.apiKey,e.name);let l=null;for(const f of t)try{const g=await f._get(a);if(g){const w=Be._fromJSON(e,g);f!==o&&(l=w),o=f;break}}catch{}const h=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Mt(o,e,r):(o=h[0],l&&await o._set(a,l.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new Mt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Oc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lc(e))return"Blackberry";if(Mc(e))return"Webos";if(Dc(e))return"Safari";if((e.includes("chrome/")||Nc(e))&&!e.includes("edge/"))return"Chrome";if(Vc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function kc(n=Ie()){return/firefox\//i.test(n)}function Dc(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nc(n=Ie()){return/crios\//i.test(n)}function Oc(n=Ie()){return/iemobile/i.test(n)}function Vc(n=Ie()){return/android/i.test(n)}function Lc(n=Ie()){return/blackberry/i.test(n)}function Mc(n=Ie()){return/webos/i.test(n)}function hi(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function tf(n=Ie()){var e;return hi(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function nf(){return Id()&&document.documentMode===10}function Fc(n=Ie()){return hi(n)||Vc(n)||Mc(n)||Lc(n)||/windows phone/i.test(n)||Oc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n,e=[]){let t;switch(n){case"Browser":t=oa(Ie());break;case"Worker":t=`${oa(Ie())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Kt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,l)=>{try{const h=e(o);a(h)}catch(h){l(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sf(n,e={}){return Ge(n,"GET","/v2/passwordPolicy",ht(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of=6;class af{constructor(e){var t,r,s,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:of,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,a,l;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(s=h.containsLowercaseLetter)!==null&&s!==void 0?s:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(l=h.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new aa(this),this.idTokenSubscription=new aa(this),this.beforeStateQueue=new rf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=wc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=$e(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Mt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Cc(this,{idToken:e}),r=await Be._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Pe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===l)&&(h!=null&&h.user)&&(s=h.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ar(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Bd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pe(this.app))return Promise.reject(je(this));const t=e?ke(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pe(this.app)?Promise.reject(je(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pe(this.app)?Promise.reject(je(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence($e(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await sf(this),t=new af(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Lr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ef(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&$e(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await Mt.create(this,[$e(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(l,this,"internal-error"),l.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Md(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function dt(n){return ke(n)}class aa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Cd(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lf(n){Mr=n}function Uc(n){return Mr.loadJS(n)}function uf(){return Mr.recaptchaEnterpriseScript}function hf(){return Mr.gapiScript}function df(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const ff="recaptcha-enterprise",pf="NO_RECAPTCHA";class gf{constructor(e){this.type=ff,this.auth=dt(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,l)=>{zd(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const f=new Wd(h);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,a(f.siteKey)}}).catch(h=>{l(h)})})}function s(o,a,l){const h=window.grecaptcha;na(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(f=>{a(f)}).catch(()=>{a(pf)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{r(this.auth).then(l=>{if(!t&&na(window.grecaptcha))s(l,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=uf();h.length!==0&&(h+=l),Uc(h).then(()=>{s(l,o,a)}).catch(f=>{a(f)})}}).catch(l=>{a(l)})})}}async function ca(n,e,t,r=!1){const s=new gf(n);let o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Us(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ca(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await ca(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(n,e){const t=ii(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Tc(o,e??{}))return s;Se(s,"already-initialized")}return t.initialize({options:e})}function _f(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map($e);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function yf(n,e,t){const r=dt(n);L(r._canInitEmulator,r,"emulator-config-failed"),L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=Bc(e),{host:a,port:l}=Ef(e),h=l===null?"":`:${l}`;r.config.emulator={url:`${o}//${a}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),vf()}function Bc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ef(n){const e=Bc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:la(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:la(a)}}}function la(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function vf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ue("not implemented")}_getIdTokenResponse(e){return Ue("not implemented")}_linkToIdToken(e,t){return Ue("not implemented")}_getReauthenticationResolver(e){return Ue("not implemented")}}async function Tf(n,e){return Ge(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function If(n,e){return Fn(n,"POST","/v1/accounts:signInWithPassword",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wf(n,e){return Fn(n,"POST","/v1/accounts:signInWithEmailLink",ht(n,e))}async function Af(n,e){return Fn(n,"POST","/v1/accounts:signInWithEmailLink",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends di{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new bn(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new bn(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Us(e,t,"signInWithPassword",If);case"emailLink":return wf(e,{email:this._email,oobCode:this._password});default:Se(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Us(e,r,"signUpPassword",Tf);case"emailLink":return Af(e,{idToken:t,email:this._email,oobCode:this._password});default:Se(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ft(n,e){return Fn(n,"POST","/v1/accounts:signInWithIdp",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="http://localhost";class wt extends di{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Se("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=oi(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new wt(r,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ft(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ft(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ft(e,t)}buildRequest(){const e={requestUri:Rf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ln(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Cf(n){const e=yn(En(n)).link,t=e?yn(En(e)).deep_link_id:null,r=yn(En(n)).deep_link_id;return(r?yn(En(r)).link:null)||r||t||e||n}class fi{constructor(e){var t,r,s,o,a,l;const h=yn(En(e)),f=(t=h.apiKey)!==null&&t!==void 0?t:null,g=(r=h.oobCode)!==null&&r!==void 0?r:null,w=Sf((s=h.mode)!==null&&s!==void 0?s:null);L(f&&g&&w,"argument-error"),this.apiKey=f,this.operation=w,this.code=g,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=h.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Cf(e);try{return new fi(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(){this.providerId=Qt.PROVIDER_ID}static credential(e,t){return bn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=fi.parseLink(t);return L(r,"argument-error"),bn._fromEmailAndCode(e,r.code,r.tenantId)}}Qt.PROVIDER_ID="password";Qt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends pi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze extends xn{constructor(){super("facebook.com")}static credential(e){return wt._fromParams({providerId:Ze.PROVIDER_ID,signInMethod:Ze.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ze.credentialFromTaggedObject(e)}static credentialFromError(e){return Ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ze.credential(e.oauthAccessToken)}catch{return null}}}Ze.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ze.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends xn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wt._fromParams({providerId:et.PROVIDER_ID,signInMethod:et.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return et.credentialFromTaggedObject(e)}static credentialFromError(e){return et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return et.credential(t,r)}catch{return null}}}et.GOOGLE_SIGN_IN_METHOD="google.com";et.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt extends xn{constructor(){super("github.com")}static credential(e){return wt._fromParams({providerId:tt.PROVIDER_ID,signInMethod:tt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tt.credentialFromTaggedObject(e)}static credentialFromError(e){return tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tt.credential(e.oauthAccessToken)}catch{return null}}}tt.GITHUB_SIGN_IN_METHOD="github.com";tt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt extends xn{constructor(){super("twitter.com")}static credential(e,t){return wt._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return nt.credential(t,r)}catch{return null}}}nt.TWITTER_SIGN_IN_METHOD="twitter.com";nt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pf(n,e){return Fn(n,"POST","/v1/accounts:signUp",ht(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await Be._fromIdTokenResponse(e,r,s),a=ua(r);return new At({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ua(r);return new At({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ua(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends Vr{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Rr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Rr(e,t,r,s)}}function $c(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Rr._fromErrorAndOperation(n,o,e,r):o})}async function bf(n,e,t=!1){const r=await $t(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return At._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e,t=!1){const{auth:r}=n;if(Pe(r.app))return Promise.reject(je(r));const s="reauthenticate";try{const o=await $t(n,$c(r,s,e,n),t);L(o.idToken,r,"internal-error");const a=ui(o.idToken);L(a,r,"internal-error");const{sub:l}=a;return L(n.uid===l,r,"user-mismatch"),At._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Se(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jc(n,e,t=!1){if(Pe(n.app))return Promise.reject(je(n));const r="signIn",s=await $c(n,r,e),o=await At._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}async function Df(n,e){return jc(dt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qc(n){const e=dt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function gy(n,e,t){if(Pe(n.app))return Promise.reject(je(n));const r=dt(n),a=await Us(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Pf).catch(h=>{throw h.code==="auth/password-does-not-meet-requirements"&&qc(n),h}),l=await At._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function my(n,e,t){return Pe(n.app)?Promise.reject(je(n)):Df(ke(n),Qt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&qc(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nf(n,e){return Ge(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _y(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=ke(n),o={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await $t(r,Nf(r.auth,o));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const l=r.providerData.find(({providerId:h})=>h==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function Of(n,e,t,r){return ke(n).onIdTokenChanged(e,t,r)}function Vf(n,e,t){return ke(n).beforeAuthStateChanged(e,t)}function yy(n,e,t,r){return ke(n).onAuthStateChanged(e,t,r)}function Ey(n){return ke(n).signOut()}async function vy(n){return ke(n).delete()}const Sr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Sr,"1"),this.storage.removeItem(Sr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf=1e3,Mf=10;class Wc extends Hc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);nf()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Mf):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Lf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Wc.type="LOCAL";const Ff=Wc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc extends Hc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}zc.type="SESSION";const Gc=zc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Fr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async f=>f(t.origin,o)),h=await xf(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((l,h)=>{const f=gi("",20);s.port1.start();const g=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(w){const R=w;if(R.data.eventId===f)switch(R.data.status){case"ack":clearTimeout(g),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),l(R.data.response);break;default:clearTimeout(g),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(){return window}function Bf(n){Ne().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(){return typeof Ne().WorkerGlobalScope<"u"&&typeof Ne().importScripts=="function"}async function $f(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function qf(){return Kc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="firebaseLocalStorageDb",Hf=1,Cr="firebaseLocalStorage",Jc="fbase_key";class Un{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function xr(n,e){return n.transaction([Cr],e?"readwrite":"readonly").objectStore(Cr)}function Wf(){const n=indexedDB.deleteDatabase(Qc);return new Un(n).toPromise()}function Bs(){const n=indexedDB.open(Qc,Hf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Cr,{keyPath:Jc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Cr)?e(r):(r.close(),await Wf(),e(await Bs()))})})}async function ha(n,e,t){const r=xr(n,!0).put({[Jc]:e,value:t});return new Un(r).toPromise()}async function zf(n,e){const t=xr(n,!1).get(e),r=await new Un(t).toPromise();return r===void 0?null:r.value}function da(n,e){const t=xr(n,!0).delete(e);return new Un(t).toPromise()}const Gf=800,Kf=3;class Yc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bs(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Kf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Kc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fr._getInstance(qf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await $f(),!this.activeServiceWorker)return;this.sender=new Uf(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bs();return await ha(e,Sr,"1"),await da(e,Sr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ha(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>zf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>da(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=xr(s,!1).getAll();return new Un(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Yc.type="LOCAL";const Qf=Yc;new Mn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n,e){return e?$e(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends di{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ft(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ft(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ft(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Jf(n){return jc(n.auth,new mi(n),n.bypassAuthState)}function Yf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),kf(t,new mi(n),n.bypassAuthState)}async function Xf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),bf(t,new mi(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:a,type:l}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Jf;case"linkViaPopup":case"linkViaRedirect":return Xf;case"reauthViaPopup":case"reauthViaRedirect":return Yf;default:Se(this.auth,"internal-error")}}resolve(e){We(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){We(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new Mn(2e3,1e4);async function Ty(n,e,t){if(Pe(n.app))return Promise.reject(be(n,"operation-not-supported-in-this-environment"));const r=dt(n);Fd(n,e,pi);const s=Xc(r,t);return new yt(r,"signInViaPopup",e,s).executeNotNull()}class yt extends Zc{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,yt.currentPopupAction&&yt.currentPopupAction.cancel(),yt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){We(this.filter.length===1,"Popup operations only handle one event");const e=gi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zf.get())};e()}}yt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="pendingRedirect",mr=new Map;class tp extends Zc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=mr.get(this.auth._key());if(!e){try{const r=await np(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}mr.set(this.auth._key(),e)}return this.bypassAuthState||mr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function np(n,e){const t=ip(e),r=sp(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function rp(n,e){mr.set(n._key(),e)}function sp(n){return $e(n._redirectPersistence)}function ip(n){return gr(ep,n.config.apiKey,n.name)}async function op(n,e,t=!1){if(Pe(n.app))return Promise.reject(je(n));const r=dt(n),s=Xc(r,e),a=await new tp(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap=10*60*1e3;class cp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!el(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(be(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ap&&this.cachedEventUids.clear(),this.cachedEventUids.has(fa(e))}saveEventToCache(e){this.cachedEventUids.add(fa(e)),this.lastProcessedEventTime=Date.now()}}function fa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function el({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function lp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return el(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function up(n,e={}){return Ge(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dp=/^https?/;async function fp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await up(n);for(const t of e)try{if(pp(t))return}catch{}Se(n,"unauthorized-domain")}function pp(n){const e=Fs(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!dp.test(t))return!1;if(hp.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=new Mn(3e4,6e4);function pa(){const n=Ne().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function mp(n){return new Promise((e,t)=>{var r,s,o;function a(){pa(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pa(),t(be(n,"network-request-failed"))},timeout:gp.get()})}if(!((s=(r=Ne().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=Ne().gapi)===null||o===void 0)&&o.load)a();else{const l=df("iframefcb");return Ne()[l]=()=>{gapi.load?a():t(be(n,"network-request-failed"))},Uc(`${hf()}?onload=${l}`).catch(h=>t(h))}}).catch(e=>{throw _r=null,e})}let _r=null;function _p(n){return _r=_r||mp(n),_r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp=new Mn(5e3,15e3),Ep="__/auth/iframe",vp="emulator/auth/iframe",Tp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ip=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wp(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?li(e,vp):`https://${n.config.authDomain}/${Ep}`,r={apiKey:e.apiKey,appName:n.name,v:Kt},s=Ip.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Ln(r).slice(1)}`}async function Ap(n){const e=await _p(n),t=Ne().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:wp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Tp,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const a=be(n,"network-request-failed"),l=Ne().setTimeout(()=>{o(a)},yp.get());function h(){Ne().clearTimeout(l),s(r)}r.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Sp=500,Cp=600,Pp="_blank",bp="http://localhost";class ga{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kp(n,e,t,r=Sp,s=Cp){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const h=Object.assign(Object.assign({},Rp),{width:r.toString(),height:s.toString(),top:o,left:a}),f=Ie().toLowerCase();t&&(l=Nc(f)?Pp:t),kc(f)&&(e=e||bp,h.scrollbars="yes");const g=Object.entries(h).reduce((R,[C,k])=>`${R}${C}=${k},`,"");if(tf(f)&&l!=="_self")return Dp(e||"",l),new ga(null);const w=window.open(e||"",l,g);L(w,n,"popup-blocked");try{w.focus()}catch{}return new ga(w)}function Dp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np="__/auth/handler",Op="emulator/auth/handler",Vp=encodeURIComponent("fac");async function ma(n,e,t,r,s,o){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Kt,eventId:s};if(e instanceof pi){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,w]of Object.entries({}))a[g]=w}if(e instanceof xn){const g=e.getScopes().filter(w=>w!=="");g.length>0&&(a.scopes=g.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const g of Object.keys(l))l[g]===void 0&&delete l[g];const h=await n._getAppCheckToken(),f=h?`#${Vp}=${encodeURIComponent(h)}`:"";return`${Lp(n)}?${Ln(l).slice(1)}${f}`}function Lp({config:n}){return n.emulator?li(n,Op):`https://${n.authDomain}/${Np}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs="webStorageSupport";class Mp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gc,this._completeRedirectFn=op,this._overrideRedirectResult=rp}async _openPopup(e,t,r,s){var o;We((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await ma(e,t,r,Fs(),s);return kp(e,a,gi())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await ma(e,t,r,Fs(),s);return Bf(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(We(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Ap(e),r=new cp(e);return t.register("authEvent",s=>(L(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Rs,{type:Rs},s=>{var o;const a=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[Rs];a!==void 0&&t(!!a),Se(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=fp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fc()||Dc()||hi()}}const Fp=Mp;var _a="@firebase/auth",ya="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bp(n){Bt(new ea("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xc(n)},f=new cf(r,s,o,h);return _f(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Bt(new ea("auth-internal",e=>{const t=dt(e.getProvider("auth").getImmediate());return(r=>new xp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),at(_a,ya,Up(n)),at(_a,ya,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p=5*60,jp=Ec("authIdTokenMaxAge")||$p;let Ea=null;const qp=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>jp)return;const s=t==null?void 0:t.token;Ea!==s&&(Ea=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Iy(n=pc()){const e=ii(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mf(n,{popupRedirectResolver:Fp,persistence:[Qf,Ff,Gc]}),r=Ec("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=qp(o.toString());Vf(t,a,()=>a(t.currentUser)),Of(t,l=>a(l))}}const s=_d("auth");return s&&yf(t,`http://${s}`),t}function Hp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=be("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",Hp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bp("Browser");var va={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Wp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],l=n[t++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},nl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,g=o>>2,w=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,C=f&63;h||(C=64,a||(R=64)),r.push(t[g],t[w],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(tl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Wp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const w=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||w==null)throw new zp;const R=o<<2|l>>4;if(r.push(R),f!==64){const C=l<<4&240|f>>2;if(r.push(C),w!==64){const k=f<<6&192|w;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gp=function(n){const e=tl(n);return nl.encodeByteArray(e,!0)},Ta=function(n){return Gp(n).replace(/\./g,"")},Kp=function(n){try{return nl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp=()=>Qp().__FIREBASE_DEFAULTS__,Yp=()=>{if(typeof process>"u"||typeof va>"u")return;const n=va.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Kp(n[1]);return e&&JSON.parse(e)},rl=()=>{try{return Jp()||Yp()||Xp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Zp=n=>{var e,t;return(t=(e=rl())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},eg=n=>{const e=Zp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ta(JSON.stringify(t)),Ta(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function rg(){var n;const e=(n=rl())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function sg(){return!rg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig="FirebaseError";class Ur extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ig,Object.setPrototypeOf(this,Ur.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,og.prototype.create)}}class og{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?ag(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Ur(s,l,r)}}function ag(n,e){return n.replace(cg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const cg=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(n){return n&&n._delegate?n._delegate:n}class ug{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const hg={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},dg=$.INFO,fg={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},pg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=fg[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gg{constructor(e){this.name=e,this._logLevel=dg,this._logHandler=pg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in $))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?hg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...e),this._logHandler(this,$.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...e),this._logHandler(this,$.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,$.INFO,...e),this._logHandler(this,$.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,$.WARN,...e),this._logHandler(this,$.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...e),this._logHandler(this,$.ERROR,...e)}}var Ia=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vt,sl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function _(){}_.prototype=p.prototype,E.D=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(y,v,I){for(var m=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)m[Me-2]=arguments[Me];return p.prototype[v].apply(y,m)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var v=0;16>v;++v)y[v]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(v=0;16>v;++v)y[v]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],v=E.g[2];var I=E.g[3],m=p+(I^_&(v^I))+y[0]+3614090360&4294967295;p=_+(m<<7&4294967295|m>>>25),m=I+(v^p&(_^v))+y[1]+3905402710&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(_^I&(p^_))+y[2]+606105819&4294967295,v=I+(m<<17&4294967295|m>>>15),m=_+(p^v&(I^p))+y[3]+3250441966&4294967295,_=v+(m<<22&4294967295|m>>>10),m=p+(I^_&(v^I))+y[4]+4118548399&4294967295,p=_+(m<<7&4294967295|m>>>25),m=I+(v^p&(_^v))+y[5]+1200080426&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(_^I&(p^_))+y[6]+2821735955&4294967295,v=I+(m<<17&4294967295|m>>>15),m=_+(p^v&(I^p))+y[7]+4249261313&4294967295,_=v+(m<<22&4294967295|m>>>10),m=p+(I^_&(v^I))+y[8]+1770035416&4294967295,p=_+(m<<7&4294967295|m>>>25),m=I+(v^p&(_^v))+y[9]+2336552879&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(_^I&(p^_))+y[10]+4294925233&4294967295,v=I+(m<<17&4294967295|m>>>15),m=_+(p^v&(I^p))+y[11]+2304563134&4294967295,_=v+(m<<22&4294967295|m>>>10),m=p+(I^_&(v^I))+y[12]+1804603682&4294967295,p=_+(m<<7&4294967295|m>>>25),m=I+(v^p&(_^v))+y[13]+4254626195&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(_^I&(p^_))+y[14]+2792965006&4294967295,v=I+(m<<17&4294967295|m>>>15),m=_+(p^v&(I^p))+y[15]+1236535329&4294967295,_=v+(m<<22&4294967295|m>>>10),m=p+(v^I&(_^v))+y[1]+4129170786&4294967295,p=_+(m<<5&4294967295|m>>>27),m=I+(_^v&(p^_))+y[6]+3225465664&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^_&(I^p))+y[11]+643717713&4294967295,v=I+(m<<14&4294967295|m>>>18),m=_+(I^p&(v^I))+y[0]+3921069994&4294967295,_=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(_^v))+y[5]+3593408605&4294967295,p=_+(m<<5&4294967295|m>>>27),m=I+(_^v&(p^_))+y[10]+38016083&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^_&(I^p))+y[15]+3634488961&4294967295,v=I+(m<<14&4294967295|m>>>18),m=_+(I^p&(v^I))+y[4]+3889429448&4294967295,_=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(_^v))+y[9]+568446438&4294967295,p=_+(m<<5&4294967295|m>>>27),m=I+(_^v&(p^_))+y[14]+3275163606&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^_&(I^p))+y[3]+4107603335&4294967295,v=I+(m<<14&4294967295|m>>>18),m=_+(I^p&(v^I))+y[8]+1163531501&4294967295,_=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(_^v))+y[13]+2850285829&4294967295,p=_+(m<<5&4294967295|m>>>27),m=I+(_^v&(p^_))+y[2]+4243563512&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^_&(I^p))+y[7]+1735328473&4294967295,v=I+(m<<14&4294967295|m>>>18),m=_+(I^p&(v^I))+y[12]+2368359562&4294967295,_=v+(m<<20&4294967295|m>>>12),m=p+(_^v^I)+y[5]+4294588738&4294967295,p=_+(m<<4&4294967295|m>>>28),m=I+(p^_^v)+y[8]+2272392833&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^_)+y[11]+1839030562&4294967295,v=I+(m<<16&4294967295|m>>>16),m=_+(v^I^p)+y[14]+4259657740&4294967295,_=v+(m<<23&4294967295|m>>>9),m=p+(_^v^I)+y[1]+2763975236&4294967295,p=_+(m<<4&4294967295|m>>>28),m=I+(p^_^v)+y[4]+1272893353&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^_)+y[7]+4139469664&4294967295,v=I+(m<<16&4294967295|m>>>16),m=_+(v^I^p)+y[10]+3200236656&4294967295,_=v+(m<<23&4294967295|m>>>9),m=p+(_^v^I)+y[13]+681279174&4294967295,p=_+(m<<4&4294967295|m>>>28),m=I+(p^_^v)+y[0]+3936430074&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^_)+y[3]+3572445317&4294967295,v=I+(m<<16&4294967295|m>>>16),m=_+(v^I^p)+y[6]+76029189&4294967295,_=v+(m<<23&4294967295|m>>>9),m=p+(_^v^I)+y[9]+3654602809&4294967295,p=_+(m<<4&4294967295|m>>>28),m=I+(p^_^v)+y[12]+3873151461&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^_)+y[15]+530742520&4294967295,v=I+(m<<16&4294967295|m>>>16),m=_+(v^I^p)+y[2]+3299628645&4294967295,_=v+(m<<23&4294967295|m>>>9),m=p+(v^(_|~I))+y[0]+4096336452&4294967295,p=_+(m<<6&4294967295|m>>>26),m=I+(_^(p|~v))+y[7]+1126891415&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~_))+y[14]+2878612391&4294967295,v=I+(m<<15&4294967295|m>>>17),m=_+(I^(v|~p))+y[5]+4237533241&4294967295,_=v+(m<<21&4294967295|m>>>11),m=p+(v^(_|~I))+y[12]+1700485571&4294967295,p=_+(m<<6&4294967295|m>>>26),m=I+(_^(p|~v))+y[3]+2399980690&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~_))+y[10]+4293915773&4294967295,v=I+(m<<15&4294967295|m>>>17),m=_+(I^(v|~p))+y[1]+2240044497&4294967295,_=v+(m<<21&4294967295|m>>>11),m=p+(v^(_|~I))+y[8]+1873313359&4294967295,p=_+(m<<6&4294967295|m>>>26),m=I+(_^(p|~v))+y[15]+4264355552&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~_))+y[6]+2734768916&4294967295,v=I+(m<<15&4294967295|m>>>17),m=_+(I^(v|~p))+y[13]+1309151649&4294967295,_=v+(m<<21&4294967295|m>>>11),m=p+(v^(_|~I))+y[4]+4149444226&4294967295,p=_+(m<<6&4294967295|m>>>26),m=I+(_^(p|~v))+y[11]+3174756917&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~_))+y[2]+718787259&4294967295,v=I+(m<<15&4294967295|m>>>17),m=_+(I^(v|~p))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(v+(m<<21&4294967295|m>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var _=p-this.blockSize,y=this.B,v=this.h,I=0;I<p;){if(v==0)for(;I<=_;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<p;)if(y[v++]=E.charCodeAt(I++),v==this.blockSize){s(this,y),v=0;break}}else for(;I<p;)if(y[v++]=E[I++],v==this.blockSize){s(this,y),v=0;break}}this.h=v,this.o+=p},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var _=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=_&255,_/=256;for(this.u(E),E=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)E[_++]=this.g[p]>>>y&255;return E};function o(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;for(var _=[],y=!0,v=E.length-1;0<=v;v--){var I=E[v]|0;y&&I==p||(_[v]=I,y=!1)}this.g=_}var l={};function h(E){return-128<=E&&128>E?o(E,function(p){return new a([p|0],0>p?-1:0)}):new a([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return w;if(0>E)return N(f(-E));for(var p=[],_=1,y=0;E>=_;y++)p[y]=E/_|0,_*=4294967296;return new a(p,0)}function g(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return N(g(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=w,v=0;v<E.length;v+=8){var I=Math.min(8,E.length-v),m=parseInt(E.substring(v,v+I),p);8>I?(I=f(Math.pow(p,I)),y=y.j(I).add(f(m))):(y=y.j(_),y=y.add(f(m)))}return y}var w=h(0),R=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-N(this).m();for(var E=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);E+=(0<=y?y:4294967296+y)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(M(this))return"-"+N(this).toString(E);for(var p=f(Math.pow(E,6)),_=this,y="";;){var v=te(_,p).g;_=Y(_,v.j(p));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=v,k(_))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function M(E){return E.h==-1}n.l=function(E){return E=Y(this,E),M(E)?-1:k(E)?0:1};function N(E){for(var p=E.g.length,_=[],y=0;y<p;y++)_[y]=~E.g[y];return new a(_,~E.h).add(R)}n.abs=function(){return M(this)?N(this):this},n.add=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0,v=0;v<=p;v++){var I=y+(this.i(v)&65535)+(E.i(v)&65535),m=(I>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);y=m>>>16,I&=65535,m&=65535,_[v]=m<<16|I}return new a(_,_[_.length-1]&-2147483648?-1:0)};function Y(E,p){return E.add(N(p))}n.j=function(E){if(k(this)||k(E))return w;if(M(this))return M(E)?N(this).j(N(E)):N(N(this).j(E));if(M(E))return N(this.j(N(E)));if(0>this.l(C)&&0>E.l(C))return f(this.m()*E.m());for(var p=this.g.length+E.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<E.g.length;v++){var I=this.i(y)>>>16,m=this.i(y)&65535,Me=E.i(v)>>>16,Zt=E.i(v)&65535;_[2*y+2*v]+=m*Zt,K(_,2*y+2*v),_[2*y+2*v+1]+=I*Zt,K(_,2*y+2*v+1),_[2*y+2*v+1]+=m*Me,K(_,2*y+2*v+1),_[2*y+2*v+2]+=I*Me,K(_,2*y+2*v+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function K(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function G(E,p){this.g=E,this.h=p}function te(E,p){if(k(p))throw Error("division by zero");if(k(E))return new G(w,w);if(M(E))return p=te(N(E),p),new G(N(p.g),N(p.h));if(M(p))return p=te(E,N(p)),new G(N(p.g),p.h);if(30<E.g.length){if(M(E)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=p;0>=y.l(E);)_=Re(_),y=Re(y);var v=ne(_,1),I=ne(y,1);for(y=ne(y,2),_=ne(_,2);!k(y);){var m=I.add(y);0>=m.l(E)&&(v=v.add(_),I=m),y=ne(y,1),_=ne(_,1)}return p=Y(E,v.j(p)),new G(v,p)}for(v=w;0<=E.l(p);){for(_=Math.max(1,Math.floor(E.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=f(_),m=I.j(p);M(m)||0<m.l(E);)_-=y,I=f(_),m=I.j(p);k(I)&&(I=R),v=v.add(I),E=Y(E,m)}return new G(v,E)}n.A=function(E){return te(this,E).h},n.and=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&E.i(y);return new a(_,this.h&E.h)},n.or=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|E.i(y);return new a(_,this.h|E.h)},n.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^E.i(y);return new a(_,this.h^E.h)};function Re(E){for(var p=E.g.length+1,_=[],y=0;y<p;y++)_[y]=E.i(y)<<1|E.i(y-1)>>>31;return new a(_,E.h)}function ne(E,p){var _=p>>5;p%=32;for(var y=E.g.length-_,v=[],I=0;I<y;I++)v[I]=0<p?E.i(I+_)>>>p|E.i(I+_+1)<<32-p:E.i(I+_);return new a(v,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,sl=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=g,vt=a}).apply(typeof Ia<"u"?Ia:typeof self<"u"?self:typeof window<"u"?window:{});var ur=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var il,vn,ol,yr,$s,al,cl,ll;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,u){return i==Array.prototype||i==Object.prototype||(i[c]=u.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof ur=="object"&&ur];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=t(this);function s(i,c){if(c)e:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var T=i[d];if(!(T in u))break e;u=u[T]}i=i[i.length-1],d=u[i],c=c(d),c!=d&&c!=null&&e(u,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var u=0,d=!1,T={next:function(){if(!d&&u<i.length){var A=u++;return{value:c(A,i[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(i){return i||function(){return o(this,function(c,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function h(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function f(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function g(i,c,u){return i.call.apply(i.bind,arguments)}function w(i,c,u){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),i.apply(c,T)}}return function(){return i.apply(c,arguments)}}function R(i,c,u){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:w,R.apply(null,arguments)}function C(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function k(i,c){function u(){}u.prototype=c.prototype,i.aa=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(d,T,A){for(var P=Array(arguments.length-2),W=2;W<arguments.length;W++)P[W-2]=arguments[W];return c.prototype[T].apply(d,P)}}function M(i){const c=i.length;if(0<c){const u=Array(c);for(let d=0;d<c;d++)u[d]=i[d];return u}return[]}function N(i,c){for(let u=1;u<arguments.length;u++){const d=arguments[u];if(h(d)){const T=i.length||0,A=d.length||0;i.length=T+A;for(let P=0;P<A;P++)i[T+P]=d[P]}else i.push(d)}}class Y{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(i){return/^[\s\xa0]*$/.test(i)}function G(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function te(i){return te[" "](i),i}te[" "]=function(){};var Re=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function ne(i,c,u){for(const d in i)c.call(u,i[d],d,i)}function E(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function p(i){const c={};for(const u in i)c[u]=i[u];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,c){let u,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(u in d)i[u]=d[u];for(let A=0;A<_.length;A++)u=_[A],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function v(i){var c=1;i=i.split(":");const u=[];for(;0<c&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function I(i){l.setTimeout(()=>{throw i},0)}function m(){var i=Qr;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class Me{constructor(){this.h=this.g=null}add(c,u){const d=Zt.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var Zt=new Y(()=>new su,i=>i.reset());class su{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let en,tn=!1,Qr=new Me,$i=()=>{const i=l.Promise.resolve(void 0);en=()=>{i.then(iu)}};var iu=()=>{for(var i;i=m();){try{i.h.call(i.g)}catch(u){I(u)}var c=Zt;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}tn=!1};function Ke(){this.s=this.s,this.C=this.C}Ke.prototype.s=!1,Ke.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ke.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function de(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}de.prototype.h=function(){this.defaultPrevented=!0};var ou=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};l.addEventListener("test",u,c),l.removeEventListener("test",u,c)}catch{}return i}();function nn(i,c){if(de.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(Re){e:{try{te(c.nodeName);var T=!0;break e}catch{}T=!1}T||(c=null)}}else u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:au[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&nn.aa.h.call(this)}}k(nn,de);var au={2:"touch",3:"pen",4:"mouse"};nn.prototype.h=function(){nn.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Hn="closure_listenable_"+(1e6*Math.random()|0),cu=0;function lu(i,c,u,d,T){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=T,this.key=++cu,this.da=this.fa=!1}function Wn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function zn(i){this.src=i,this.g={},this.h=0}zn.prototype.add=function(i,c,u,d,T){var A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);var P=Yr(i,c,d,T);return-1<P?(c=i[P],u||(c.fa=!1)):(c=new lu(c,this.src,A,!!d,T),c.fa=u,i.push(c)),c};function Jr(i,c){var u=c.type;if(u in i.g){var d=i.g[u],T=Array.prototype.indexOf.call(d,c,void 0),A;(A=0<=T)&&Array.prototype.splice.call(d,T,1),A&&(Wn(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Yr(i,c,u,d){for(var T=0;T<i.length;++T){var A=i[T];if(!A.da&&A.listener==c&&A.capture==!!u&&A.ha==d)return T}return-1}var Xr="closure_lm_"+(1e6*Math.random()|0),Zr={};function ji(i,c,u,d,T){if(Array.isArray(c)){for(var A=0;A<c.length;A++)ji(i,c[A],u,d,T);return null}return u=Wi(u),i&&i[Hn]?i.K(c,u,f(d)?!!d.capture:!1,T):uu(i,c,u,!1,d,T)}function uu(i,c,u,d,T,A){if(!c)throw Error("Invalid event type");var P=f(T)?!!T.capture:!!T,W=ts(i);if(W||(i[Xr]=W=new zn(i)),u=W.add(c,u,d,P,A),u.proxy)return u;if(d=hu(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)ou||(T=P),T===void 0&&(T=!1),i.addEventListener(c.toString(),d,T);else if(i.attachEvent)i.attachEvent(Hi(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function hu(){function i(u){return c.call(i.src,i.listener,u)}const c=du;return i}function qi(i,c,u,d,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)qi(i,c[A],u,d,T);else d=f(d)?!!d.capture:!!d,u=Wi(u),i&&i[Hn]?(i=i.i,c=String(c).toString(),c in i.g&&(A=i.g[c],u=Yr(A,u,d,T),-1<u&&(Wn(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete i.g[c],i.h--)))):i&&(i=ts(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Yr(c,u,d,T)),(u=-1<i?c[i]:null)&&es(u))}function es(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[Hn])Jr(c.i,i);else{var u=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(u,d,i.capture):c.detachEvent?c.detachEvent(Hi(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=ts(c))?(Jr(u,i),u.h==0&&(u.src=null,c[Xr]=null)):Wn(i)}}}function Hi(i){return i in Zr?Zr[i]:Zr[i]="on"+i}function du(i,c){if(i.da)i=!0;else{c=new nn(c,this);var u=i.listener,d=i.ha||i.src;i.fa&&es(i),i=u.call(d,c)}return i}function ts(i){return i=i[Xr],i instanceof zn?i:null}var ns="__closure_events_fn_"+(1e9*Math.random()>>>0);function Wi(i){return typeof i=="function"?i:(i[ns]||(i[ns]=function(c){return i.handleEvent(c)}),i[ns])}function fe(){Ke.call(this),this.i=new zn(this),this.M=this,this.F=null}k(fe,Ke),fe.prototype[Hn]=!0,fe.prototype.removeEventListener=function(i,c,u,d){qi(this,i,c,u,d)};function Ee(i,c){var u,d=i.F;if(d)for(u=[];d;d=d.F)u.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new de(c,i);else if(c instanceof de)c.target=c.target||i;else{var T=c;c=new de(d,i),y(c,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var P=c.g=u[A];T=Gn(P,d,!0,c)&&T}if(P=c.g=i,T=Gn(P,d,!0,c)&&T,T=Gn(P,d,!1,c)&&T,u)for(A=0;A<u.length;A++)P=c.g=u[A],T=Gn(P,d,!1,c)&&T}fe.prototype.N=function(){if(fe.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var u=i.g[c],d=0;d<u.length;d++)Wn(u[d]);delete i.g[c],i.h--}}this.F=null},fe.prototype.K=function(i,c,u,d){return this.i.add(String(i),c,!1,u,d)},fe.prototype.L=function(i,c,u,d){return this.i.add(String(i),c,!0,u,d)};function Gn(i,c,u,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,A=0;A<c.length;++A){var P=c[A];if(P&&!P.da&&P.capture==u){var W=P.listener,ce=P.ha||P.src;P.fa&&Jr(i.i,P),T=W.call(ce,d)!==!1&&T}}return T&&!d.defaultPrevented}function zi(i,c,u){if(typeof i=="function")u&&(i=R(i,u));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(i,c||0)}function Gi(i){i.g=zi(()=>{i.g=null,i.i&&(i.i=!1,Gi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class fu extends Ke{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Gi(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function rn(i){Ke.call(this),this.h=i,this.g={}}k(rn,Ke);var Ki=[];function Qi(i){ne(i.g,function(c,u){this.g.hasOwnProperty(u)&&es(c)},i),i.g={}}rn.prototype.N=function(){rn.aa.N.call(this),Qi(this)},rn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var rs=l.JSON.stringify,pu=l.JSON.parse,gu=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function ss(){}ss.prototype.h=null;function Ji(i){return i.h||(i.h=i.i())}function Yi(){}var sn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function is(){de.call(this,"d")}k(is,de);function os(){de.call(this,"c")}k(os,de);var ft={},Xi=null;function Kn(){return Xi=Xi||new fe}ft.La="serverreachability";function Zi(i){de.call(this,ft.La,i)}k(Zi,de);function on(i){const c=Kn();Ee(c,new Zi(c))}ft.STAT_EVENT="statevent";function eo(i,c){de.call(this,ft.STAT_EVENT,i),this.stat=c}k(eo,de);function ve(i){const c=Kn();Ee(c,new eo(c,i))}ft.Ma="timingevent";function to(i,c){de.call(this,ft.Ma,i),this.size=c}k(to,de);function an(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},c)}function cn(){this.g=!0}cn.prototype.xa=function(){this.g=!1};function mu(i,c,u,d,T,A){i.info(function(){if(i.g)if(A)for(var P="",W=A.split("&"),ce=0;ce<W.length;ce++){var q=W[ce].split("=");if(1<q.length){var pe=q[0];q=q[1];var ge=pe.split("_");P=2<=ge.length&&ge[1]=="type"?P+(pe+"="+q+"&"):P+(pe+"=redacted&")}}else P=null;else P=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+c+`
`+u+`
`+P})}function _u(i,c,u,d,T,A,P){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+c+`
`+u+`
`+A+" "+P})}function Pt(i,c,u,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Eu(i,u)+(d?" "+d:"")})}function yu(i,c){i.info(function(){return"TIMEOUT: "+c})}cn.prototype.info=function(){};function Eu(i,c){if(!i.g)return c;if(!c)return null;try{var u=JSON.parse(c);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var d=u[i];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var P=1;P<T.length;P++)T[P]=""}}}}return rs(u)}catch{return c}}var Qn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},no={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},as;function Jn(){}k(Jn,ss),Jn.prototype.g=function(){return new XMLHttpRequest},Jn.prototype.i=function(){return{}},as=new Jn;function Qe(i,c,u,d){this.j=i,this.i=c,this.l=u,this.R=d||1,this.U=new rn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ro}function ro(){this.i=null,this.g="",this.h=!1}var so={},cs={};function ls(i,c,u){i.L=1,i.v=er(Fe(c)),i.m=u,i.P=!0,io(i,null)}function io(i,c){i.F=Date.now(),Yn(i),i.A=Fe(i.v);var u=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),vo(u.i,"t",d),i.C=0,u=i.j.J,i.h=new ro,i.g=xo(i.j,u?c:null,!i.m),0<i.O&&(i.M=new fu(R(i.Y,i,i.g),i.O)),c=i.U,u=i.g,d=i.ca;var T="readystatechange";Array.isArray(T)||(T&&(Ki[0]=T.toString()),T=Ki);for(var A=0;A<T.length;A++){var P=ji(u,T[A],d||c.handleEvent,!1,c.h||c);if(!P)break;c.g[P.key]=P}c=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),on(),mu(i.i,i.u,i.A,i.l,i.R,i.m)}Qe.prototype.ca=function(i){i=i.target;const c=this.M;c&&xe(i)==3?c.j():this.Y(i)},Qe.prototype.Y=function(i){try{if(i==this.g)e:{const ge=xe(this.g);var c=this.g.Ba();const Dt=this.g.Z();if(!(3>ge)&&(ge!=3||this.g&&(this.h.h||this.g.oa()||Co(this.g)))){this.J||ge!=4||c==7||(c==8||0>=Dt?on(3):on(2)),us(this);var u=this.g.Z();this.X=u;t:if(oo(this)){var d=Co(this.g);i="";var T=d.length,A=xe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){pt(this),ln(this);var P="";break t}this.h.i=new l.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,i+=this.h.i.decode(d[c],{stream:!(A&&c==T-1)});d.length=0,this.h.g+=i,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=u==200,_u(this.i,this.u,this.A,this.l,this.R,ge,u),this.o){if(this.T&&!this.K){t:{if(this.g){var W,ce=this.g;if((W=ce.g?ce.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var q=W;break t}}q=null}if(u=q)Pt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hs(this,u);else{this.o=!1,this.s=3,ve(12),pt(this),ln(this);break e}}if(this.P){u=!0;let Ce;for(;!this.J&&this.C<P.length;)if(Ce=vu(this,P),Ce==cs){ge==4&&(this.s=4,ve(14),u=!1),Pt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ce==so){this.s=4,ve(15),Pt(this.i,this.l,P,"[Invalid Chunk]"),u=!1;break}else Pt(this.i,this.l,Ce,null),hs(this,Ce);if(oo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ge!=4||P.length!=0||this.h.h||(this.s=1,ve(16),u=!1),this.o=this.o&&u,!u)Pt(this.i,this.l,P,"[Invalid Chunked Response]"),pt(this),ln(this);else if(0<P.length&&!this.W){this.W=!0;var pe=this.j;pe.g==this&&pe.ba&&!pe.M&&(pe.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),_s(pe),pe.M=!0,ve(11))}}else Pt(this.i,this.l,P,null),hs(this,P);ge==4&&pt(this),this.o&&!this.J&&(ge==4?Vo(this.j,this):(this.o=!1,Yn(this)))}else Fu(this.g),u==400&&0<P.indexOf("Unknown SID")?(this.s=3,ve(12)):(this.s=0,ve(13)),pt(this),ln(this)}}}catch{}finally{}};function oo(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function vu(i,c){var u=i.C,d=c.indexOf(`
`,u);return d==-1?cs:(u=Number(c.substring(u,d)),isNaN(u)?so:(d+=1,d+u>c.length?cs:(c=c.slice(d,d+u),i.C=d+u,c)))}Qe.prototype.cancel=function(){this.J=!0,pt(this)};function Yn(i){i.S=Date.now()+i.I,ao(i,i.I)}function ao(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=an(R(i.ba,i),c)}function us(i){i.B&&(l.clearTimeout(i.B),i.B=null)}Qe.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(yu(this.i,this.A),this.L!=2&&(on(),ve(17)),pt(this),this.s=2,ln(this)):ao(this,this.S-i)};function ln(i){i.j.G==0||i.J||Vo(i.j,i)}function pt(i){us(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,Qi(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function hs(i,c){try{var u=i.j;if(u.G!=0&&(u.g==i||ds(u.h,i))){if(!i.K&&ds(u.h,i)&&u.G==3){try{var d=u.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)or(u),sr(u);else break e;ms(u),ve(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=an(R(u.Za,u),6e3));if(1>=uo(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else mt(u,11)}else if((i.K||u.g==i)&&or(u),!K(c))for(T=u.Da.g.parse(c),c=0;c<T.length;c++){let q=T[c];if(u.T=q[0],q=q[1],u.G==2)if(q[0]=="c"){u.K=q[1],u.ia=q[2];const pe=q[3];pe!=null&&(u.la=pe,u.j.info("VER="+u.la));const ge=q[4];ge!=null&&(u.Aa=ge,u.j.info("SVER="+u.Aa));const Dt=q[5];Dt!=null&&typeof Dt=="number"&&0<Dt&&(d=1.5*Dt,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Ce=i.g;if(Ce){const cr=Ce.g?Ce.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(cr){var A=d.h;A.g||cr.indexOf("spdy")==-1&&cr.indexOf("quic")==-1&&cr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(fs(A,A.h),A.h=null))}if(d.D){const ys=Ce.g?Ce.g.getResponseHeader("X-HTTP-Session-Id"):null;ys&&(d.ya=ys,Q(d.I,d.D,ys))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var P=i;if(d.qa=Fo(d,d.J?d.ia:null,d.W),P.K){ho(d.h,P);var W=P,ce=d.L;ce&&(W.I=ce),W.B&&(us(W),Yn(W)),d.g=P}else No(d);0<u.i.length&&ir(u)}else q[0]!="stop"&&q[0]!="close"||mt(u,7);else u.G==3&&(q[0]=="stop"||q[0]=="close"?q[0]=="stop"?mt(u,7):gs(u):q[0]!="noop"&&u.l&&u.l.ta(q),u.v=0)}}on(4)}catch{}}var Tu=class{constructor(i,c){this.g=i,this.map=c}};function co(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function lo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function uo(i){return i.h?1:i.g?i.g.size:0}function ds(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function fs(i,c){i.g?i.g.add(c):i.h=c}function ho(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}co.prototype.cancel=function(){if(this.i=fo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function fo(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.D);return c}return M(i.i)}function Iu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var c=[],u=i.length,d=0;d<u;d++)c.push(i[d]);return c}c=[],u=0;for(d in i)c[u++]=i[d];return c}function wu(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var c=[];i=i.length;for(var u=0;u<i;u++)c.push(u);return c}c=[],u=0;for(const d in i)c[u++]=d;return c}}}function po(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var u=wu(i),d=Iu(i),T=d.length,A=0;A<T;A++)c.call(void 0,d[A],u&&u[A],i)}var go=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Au(i,c){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var d=i[u].indexOf("="),T=null;if(0<=d){var A=i[u].substring(0,d);T=i[u].substring(d+1)}else A=i[u];c(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function gt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof gt){this.h=i.h,Xn(this,i.j),this.o=i.o,this.g=i.g,Zn(this,i.s),this.l=i.l;var c=i.i,u=new dn;u.i=c.i,c.g&&(u.g=new Map(c.g),u.h=c.h),mo(this,u),this.m=i.m}else i&&(c=String(i).match(go))?(this.h=!1,Xn(this,c[1]||"",!0),this.o=un(c[2]||""),this.g=un(c[3]||"",!0),Zn(this,c[4]),this.l=un(c[5]||"",!0),mo(this,c[6]||"",!0),this.m=un(c[7]||"")):(this.h=!1,this.i=new dn(null,this.h))}gt.prototype.toString=function(){var i=[],c=this.j;c&&i.push(hn(c,_o,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(hn(c,_o,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(hn(u,u.charAt(0)=="/"?Cu:Su,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",hn(u,bu)),i.join("")};function Fe(i){return new gt(i)}function Xn(i,c,u){i.j=u?un(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function Zn(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function mo(i,c,u){c instanceof dn?(i.i=c,ku(i.i,i.h)):(u||(c=hn(c,Pu)),i.i=new dn(c,i.h))}function Q(i,c,u){i.i.set(c,u)}function er(i){return Q(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function un(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function hn(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,Ru),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Ru(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var _o=/[#\/\?@]/g,Su=/[#\?:]/g,Cu=/[#\?]/g,Pu=/[#\?@]/g,bu=/#/g;function dn(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function Je(i){i.g||(i.g=new Map,i.h=0,i.i&&Au(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=dn.prototype,n.add=function(i,c){Je(this),this.i=null,i=bt(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function yo(i,c){Je(i),c=bt(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function Eo(i,c){return Je(i),c=bt(i,c),i.g.has(c)}n.forEach=function(i,c){Je(this),this.g.forEach(function(u,d){u.forEach(function(T){i.call(c,T,d,this)},this)},this)},n.na=function(){Je(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),u=[];for(let d=0;d<c.length;d++){const T=i[d];for(let A=0;A<T.length;A++)u.push(c[d])}return u},n.V=function(i){Je(this);let c=[];if(typeof i=="string")Eo(this,i)&&(c=c.concat(this.g.get(bt(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)c=c.concat(i[u])}return c},n.set=function(i,c){return Je(this),this.i=null,i=bt(this,i),Eo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function vo(i,c,u){yo(i,c),0<u.length&&(i.i=null,i.g.set(bt(i,c),M(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var u=0;u<c.length;u++){var d=c[u];const A=encodeURIComponent(String(d)),P=this.V(d);for(d=0;d<P.length;d++){var T=A;P[d]!==""&&(T+="="+encodeURIComponent(String(P[d]))),i.push(T)}}return this.i=i.join("&")};function bt(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function ku(i,c){c&&!i.j&&(Je(i),i.i=null,i.g.forEach(function(u,d){var T=d.toLowerCase();d!=T&&(yo(this,d),vo(this,T,u))},i)),i.j=c}function Du(i,c){const u=new cn;if(l.Image){const d=new Image;d.onload=C(Ye,u,"TestLoadImage: loaded",!0,c,d),d.onerror=C(Ye,u,"TestLoadImage: error",!1,c,d),d.onabort=C(Ye,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=C(Ye,u,"TestLoadImage: timeout",!1,c,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function Nu(i,c){const u=new cn,d=new AbortController,T=setTimeout(()=>{d.abort(),Ye(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?Ye(u,"TestPingServer: ok",!0,c):Ye(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),Ye(u,"TestPingServer: error",!1,c)})}function Ye(i,c,u,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(u)}catch{}}function Ou(){this.g=new gu}function Vu(i,c,u){const d=u||"";try{po(i,function(T,A){let P=T;f(T)&&(P=rs(T)),c.push(d+A+"="+encodeURIComponent(P))})}catch(T){throw c.push(d+"type="+encodeURIComponent("_badmap")),T}}function tr(i){this.l=i.Ub||null,this.j=i.eb||!1}k(tr,ss),tr.prototype.g=function(){return new nr(this.l,this.j)},tr.prototype.i=function(i){return function(){return i}}({});function nr(i,c){fe.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(nr,fe),n=nr.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,pn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,pn(this)),this.g&&(this.readyState=3,pn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;To(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function To(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?fn(this):pn(this),this.readyState==3&&To(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,fn(this))},n.Qa=function(i){this.g&&(this.response=i,fn(this))},n.ga=function(){this.g&&fn(this)};function fn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,pn(i)}n.setRequestHeader=function(i,c){this.u.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function pn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(nr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Io(i){let c="";return ne(i,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function ps(i,c,u){e:{for(d in u){var d=!1;break e}d=!0}d||(u=Io(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):Q(i,c,u))}function X(i){fe.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(X,fe);var Lu=/^https?$/i,Mu=["POST","PUT"];n=X.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():as.g(),this.v=this.o?Ji(this.o):Ji(as),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(A){wo(this,A);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)u.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const A of d.keys())u.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Mu,c,void 0))||d||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,P]of u)this.g.setRequestHeader(A,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{So(this),this.u=!0,this.g.send(i),this.u=!1}catch(A){wo(this,A)}};function wo(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,Ao(i),rr(i)}function Ao(i){i.A||(i.A=!0,Ee(i,"complete"),Ee(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Ee(this,"complete"),Ee(this,"abort"),rr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),rr(this,!0)),X.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ro(this):this.bb())},n.bb=function(){Ro(this)};function Ro(i){if(i.h&&typeof a<"u"&&(!i.v[1]||xe(i)!=4||i.Z()!=2)){if(i.u&&xe(i)==4)zi(i.Ea,0,i);else if(Ee(i,"readystatechange"),xe(i)==4){i.h=!1;try{const P=i.Z();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var u;if(!(u=c)){var d;if(d=P===0){var T=String(i.D).match(go)[1]||null;!T&&l.self&&l.self.location&&(T=l.self.location.protocol.slice(0,-1)),d=!Lu.test(T?T.toLowerCase():"")}u=d}if(u)Ee(i,"complete"),Ee(i,"success");else{i.m=6;try{var A=2<xe(i)?i.g.statusText:""}catch{A=""}i.l=A+" ["+i.Z()+"]",Ao(i)}}finally{rr(i)}}}}function rr(i,c){if(i.g){So(i);const u=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||Ee(i,"ready");try{u.onreadystatechange=d}catch{}}}function So(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function xe(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<xe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),pu(c)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Fu(i){const c={};i=(i.g&&2<=xe(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(K(i[d]))continue;var u=v(i[d]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=c[T]||[];c[T]=A,A.push(u)}E(c,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function gn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function Po(i){this.Aa=0,this.i=[],this.j=new cn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=gn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=gn("baseRetryDelayMs",5e3,i),this.cb=gn("retryDelaySeedMs",1e4,i),this.Wa=gn("forwardChannelMaxRetries",2,i),this.wa=gn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new co(i&&i.concurrentRequestLimit),this.Da=new Ou,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Po.prototype,n.la=8,n.G=1,n.connect=function(i,c,u,d){ve(0),this.W=i,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=Fo(this,null,this.W),ir(this)};function gs(i){if(bo(i),i.G==3){var c=i.U++,u=Fe(i.I);if(Q(u,"SID",i.K),Q(u,"RID",c),Q(u,"TYPE","terminate"),mn(i,u),c=new Qe(i,i.j,c),c.L=2,c.v=er(Fe(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=c.v,u=!0),u||(c.g=xo(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Yn(c)}Mo(i)}function sr(i){i.g&&(_s(i),i.g.cancel(),i.g=null)}function bo(i){sr(i),i.u&&(l.clearTimeout(i.u),i.u=null),or(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function ir(i){if(!lo(i.h)&&!i.s){i.s=!0;var c=i.Ga;en||$i(),tn||(en(),tn=!0),Qr.add(c,i),i.B=0}}function xu(i,c){return uo(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=an(R(i.Ga,i,c),Lo(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const T=new Qe(this,this.j,i);let A=this.o;if(this.S&&(A?(A=p(A),y(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var c=0,u=0;u<this.i.length;u++){t:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=u;break e}if(c===4096||u===this.i.length-1){c=u+1;break e}}c=1e3}else c=1e3;c=Do(this,T,c),u=Fe(this.I),Q(u,"RID",i),Q(u,"CVER",22),this.D&&Q(u,"X-HTTP-Session-Id",this.D),mn(this,u),A&&(this.O?c="headers="+encodeURIComponent(String(Io(A)))+"&"+c:this.m&&ps(u,this.m,A)),fs(this.h,T),this.Ua&&Q(u,"TYPE","init"),this.P?(Q(u,"$req",c),Q(u,"SID","null"),T.T=!0,ls(T,u,null)):ls(T,u,c),this.G=2}}else this.G==3&&(i?ko(this,i):this.i.length==0||lo(this.h)||ko(this))};function ko(i,c){var u;c?u=c.l:u=i.U++;const d=Fe(i.I);Q(d,"SID",i.K),Q(d,"RID",u),Q(d,"AID",i.T),mn(i,d),i.m&&i.o&&ps(d,i.m,i.o),u=new Qe(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),c&&(i.i=c.D.concat(i.i)),c=Do(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),fs(i.h,u),ls(u,d,c)}function mn(i,c){i.H&&ne(i.H,function(u,d){Q(c,d,u)}),i.l&&po({},function(u,d){Q(c,d,u)})}function Do(i,c,u){u=Math.min(i.i.length,u);var d=i.l?R(i.l.Na,i.l,i):null;e:{var T=i.i;let A=-1;for(;;){const P=["count="+u];A==-1?0<u?(A=T[0].g,P.push("ofs="+A)):A=0:P.push("ofs="+A);let W=!0;for(let ce=0;ce<u;ce++){let q=T[ce].g;const pe=T[ce].map;if(q-=A,0>q)A=Math.max(0,T[ce].g-100),W=!1;else try{Vu(pe,P,"req"+q+"_")}catch{d&&d(pe)}}if(W){d=P.join("&");break e}}}return i=i.i.splice(0,u),c.D=i,d}function No(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;en||$i(),tn||(en(),tn=!0),Qr.add(c,i),i.v=0}}function ms(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=an(R(i.Fa,i),Lo(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Oo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=an(R(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ve(10),sr(this),Oo(this))};function _s(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function Oo(i){i.g=new Qe(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=Fe(i.qa);Q(c,"RID","rpc"),Q(c,"SID",i.K),Q(c,"AID",i.T),Q(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&Q(c,"TO",i.ja),Q(c,"TYPE","xmlhttp"),mn(i,c),i.m&&i.o&&ps(c,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=er(Fe(c)),u.m=null,u.P=!0,io(u,i)}n.Za=function(){this.C!=null&&(this.C=null,sr(this),ms(this),ve(19))};function or(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function Vo(i,c){var u=null;if(i.g==c){or(i),_s(i),i.g=null;var d=2}else if(ds(i.h,c))u=c.D,ho(i.h,c),d=1;else return;if(i.G!=0){if(c.o)if(d==1){u=c.m?c.m.length:0,c=Date.now()-c.F;var T=i.B;d=Kn(),Ee(d,new to(d,u)),ir(i)}else No(i);else if(T=c.s,T==3||T==0&&0<c.X||!(d==1&&xu(i,c)||d==2&&ms(i)))switch(u&&0<u.length&&(c=i.h,c.i=c.i.concat(u)),T){case 1:mt(i,5);break;case 4:mt(i,10);break;case 3:mt(i,6);break;default:mt(i,2)}}}function Lo(i,c){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*c}function mt(i,c){if(i.j.info("Error code "+c),c==2){var u=R(i.fb,i),d=i.Xa;const T=!d;d=new gt(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Xn(d,"https"),er(d),T?Du(d.toString(),u):Nu(d.toString(),u)}else ve(2);i.G=0,i.l&&i.l.sa(c),Mo(i),bo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),ve(2)):(this.j.info("Failed to ping google.com"),ve(1))};function Mo(i){if(i.G=0,i.ka=[],i.l){const c=fo(i.h);(c.length!=0||i.i.length!=0)&&(N(i.ka,c),N(i.ka,i.i),i.h.i.length=0,M(i.i),i.i.length=0),i.l.ra()}}function Fo(i,c,u){var d=u instanceof gt?Fe(u):new gt(u);if(d.g!="")c&&(d.g=c+"."+d.g),Zn(d,d.s);else{var T=l.location;d=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var A=new gt(null);d&&Xn(A,d),c&&(A.g=c),T&&Zn(A,T),u&&(A.l=u),d=A}return u=i.D,c=i.ya,u&&c&&Q(d,u,c),Q(d,"VER",i.la),mn(i,d),d}function xo(i,c,u){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new X(new tr({eb:u})):new X(i.pa),c.Ha(i.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Uo(){}n=Uo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ar(){}ar.prototype.g=function(i,c){return new Ae(i,c)};function Ae(i,c){fe.call(this),this.g=new Po(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!K(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new kt(this)}k(Ae,fe),Ae.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ae.prototype.close=function(){gs(this.g)},Ae.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=rs(i),i=u);c.i.push(new Tu(c.Ya++,i)),c.G==3&&ir(c)},Ae.prototype.N=function(){this.g.l=null,delete this.j,gs(this.g),delete this.g,Ae.aa.N.call(this)};function Bo(i){is.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){e:{for(const u in c){i=u;break e}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}k(Bo,is);function $o(){os.call(this),this.status=1}k($o,os);function kt(i){this.g=i}k(kt,Uo),kt.prototype.ua=function(){Ee(this.g,"a")},kt.prototype.ta=function(i){Ee(this.g,new Bo(i))},kt.prototype.sa=function(i){Ee(this.g,new $o)},kt.prototype.ra=function(){Ee(this.g,"b")},ar.prototype.createWebChannel=ar.prototype.g,Ae.prototype.send=Ae.prototype.o,Ae.prototype.open=Ae.prototype.m,Ae.prototype.close=Ae.prototype.close,ll=function(){return new ar},cl=function(){return Kn()},al=ft,$s={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Qn.NO_ERROR=0,Qn.TIMEOUT=8,Qn.HTTP_ERROR=6,yr=Qn,no.COMPLETE="complete",ol=no,Yi.EventType=sn,sn.OPEN="a",sn.CLOSE="b",sn.ERROR="c",sn.MESSAGE="d",fe.prototype.listen=fe.prototype.K,vn=Yi,X.prototype.listenOnce=X.prototype.L,X.prototype.getLastError=X.prototype.Ka,X.prototype.getLastErrorCode=X.prototype.Ba,X.prototype.getStatus=X.prototype.Z,X.prototype.getResponseJson=X.prototype.Oa,X.prototype.getResponseText=X.prototype.oa,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Ha,il=X}).apply(typeof ur<"u"?ur:typeof self<"u"?self:typeof window<"u"?window:{});const wa="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}_e.UNAUTHENTICATED=new _e(null),_e.GOOGLE_CREDENTIALS=new _e("google-credentials-uid"),_e.FIRST_PARTY=new _e("first-party-uid"),_e.MOCK_USER=new _e("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jt="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new gg("@firebase/firestore");function _n(){return Rt.logLevel}function D(n,...e){if(Rt.logLevel<=$.DEBUG){const t=e.map(_i);Rt.debug(`Firestore (${Jt}): ${n}`,...t)}}function ze(n,...e){if(Rt.logLevel<=$.ERROR){const t=e.map(_i);Rt.error(`Firestore (${Jt}): ${n}`,...t)}}function jt(n,...e){if(Rt.logLevel<=$.WARN){const t=e.map(_i);Rt.warn(`Firestore (${Jt}): ${n}`,...t)}}function _i(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n="Unexpected state"){const e=`FIRESTORE (${Jt}) INTERNAL ASSERTION FAILED: `+n;throw ze(e),new Error(e)}function ee(n,e){n||x()}function B(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends Ur{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class mg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(_e.UNAUTHENTICATED))}shutdown(){}}class _g{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class yg{constructor(e){this.t=e,this.currentUser=_e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ee(this.o===void 0);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new Tt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Tt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Tt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ee(typeof r.accessToken=="string"),new ul(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ee(e===null||typeof e=="string"),new _e(e)}}class Eg{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=_e.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class vg{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Eg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(_e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Tg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ig{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ee(this.o===void 0);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ee(typeof t.token=="string"),this.R=t.token,new Tg(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=wg(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%e.length))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function qt(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return we.fromMillis(Date.now())}static fromDate(e){return we.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new we(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.timestamp=e}static fromTimestamp(e){return new F(e)}static min(){return new F(new we(0,0))}static max(){return new F(new we(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(),r===void 0?r=e.length-t:r>e.length-t&&x(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return kn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof kn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=e.get(s),a=t.get(s);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Z extends kn{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new O(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const Ag=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends kn{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return Ag.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Te(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new O(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.path=e}static fromPath(e){return new V(Z.fromString(e))}static fromName(e){return new V(Z.fromString(e).popFirst(5))}static empty(){return new V(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new V(new Z(e.slice()))}}function Rg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new we(t+1,0):new we(t,r));return new ct(s,V.empty(),e)}function Sg(n){return new ct(n.readTime,n.key,-1)}class ct{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ct(F.min(),V.empty(),-1)}static max(){return new ct(F.max(),V.empty(),-1)}}function Cg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=V.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Pg)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let s=0,o=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&t()},h=>r(h))}),a=!0,o===s&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(s=>s?S.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new S((r,s)=>{const o=e.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next(g=>{a[f]=g,++l,l===o&&r(a)},g=>s(g))}})}static doWhile(e,t){return new S((r,s)=>{const o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}}function kg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Bn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Ei.oe=-1;function Br(n){return n==null}function js(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function $r(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Dg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||le.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,le.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,le.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new hr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new hr(this.root,e,this.comparator,!1)}getReverseIterator(){return new hr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new hr(this.root,e,this.comparator,!0)}}class hr{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class le{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??le.RED,this.left=s??le.EMPTY,this.right=o??le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new le(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return le.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw x();const e=this.left.check();if(e!==this.right.check())throw x();return e+(this.isRed()?0:1)}}le.EMPTY=null,le.RED=!0,le.BLACK=!1;le.EMPTY=new class{constructor(){this.size=0}get key(){throw x()}get value(){throw x()}get color(){throw x()}get left(){throw x()}get right(){throw x()}copy(e,t,r,s,o){return this}insert(e,t,r){return new le(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ra(this.data.getIterator())}getIteratorFrom(e){return new Ra(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ue(this.comparator);return t.data=e,t}}class Ra{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new rt([])}unionWith(e){let t=new ue(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new rt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return qt(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new dl("Invalid base64 string: "+o):o}}(e);return new he(t)}static fromUint8Array(e){const t=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(e);return new he(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}he.EMPTY_BYTE_STRING=new he("");const Ng=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lt(n){if(ee(!!n),typeof n=="string"){let e=0;const t=Ng.exec(n);if(ee(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function St(n){return typeof n=="string"?he.fromBase64String(n):he.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ti(n){const e=n.mapValue.fields.__previous_value__;return vi(e)?Ti(e):e}function Dn(n){const e=lt(n.mapValue.fields.__local_write_time__.timestampValue);return new we(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e,t,r,s,o,a,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f}}class Nn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Nn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Nn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr={mapValue:{}};function Ct(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?vi(n)?4:Lg(n)?9007199254740991:Vg(n)?10:11:x()}function Ve(n,e){if(n===e)return!0;const t=Ct(n);if(t!==Ct(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Dn(n).isEqual(Dn(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=lt(s.timestampValue),l=lt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return St(s.bytesValue).isEqual(St(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return re(s.geoPointValue.latitude)===re(o.geoPointValue.latitude)&&re(s.geoPointValue.longitude)===re(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return re(s.integerValue)===re(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=re(s.doubleValue),l=re(o.doubleValue);return a===l?js(a)===js(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return qt(n.arrayValue.values||[],e.arrayValue.values||[],Ve);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Aa(a)!==Aa(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ve(a[h],l[h])))return!1;return!0}(n,e);default:return x()}}function On(n,e){return(n.values||[]).find(t=>Ve(t,e))!==void 0}function Ht(n,e){if(n===e)return 0;const t=Ct(n),r=Ct(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(o,a){const l=re(o.integerValue||o.doubleValue),h=re(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,e);case 3:return Sa(n.timestampValue,e.timestampValue);case 4:return Sa(Dn(n),Dn(e));case 5:return H(n.stringValue,e.stringValue);case 6:return function(o,a){const l=St(o),h=St(a);return l.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const g=H(l[f],h[f]);if(g!==0)return g}return H(l.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const l=H(re(o.latitude),re(a.latitude));return l!==0?l:H(re(o.longitude),re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ca(n.arrayValue,e.arrayValue);case 10:return function(o,a){var l,h,f,g;const w=o.fields||{},R=a.fields||{},C=(l=w.value)===null||l===void 0?void 0:l.arrayValue,k=(h=R.value)===null||h===void 0?void 0:h.arrayValue,M=H(((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0,((g=k==null?void 0:k.values)===null||g===void 0?void 0:g.length)||0);return M!==0?M:Ca(C,k)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===dr.mapValue&&a===dr.mapValue)return 0;if(o===dr.mapValue)return 1;if(a===dr.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},g=Object.keys(f);h.sort(),g.sort();for(let w=0;w<h.length&&w<g.length;++w){const R=H(h[w],g[w]);if(R!==0)return R;const C=Ht(l[h[w]],f[g[w]]);if(C!==0)return C}return H(h.length,g.length)}(n.mapValue,e.mapValue);default:throw x()}}function Sa(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=lt(n),r=lt(e),s=H(t.seconds,r.seconds);return s!==0?s:H(t.nanos,r.nanos)}function Ca(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=Ht(t[s],r[s]);if(o)return o}return H(t.length,r.length)}function Wt(n){return qs(n)}function qs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return St(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return V.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=qs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${qs(t.fields[a])}`;return s+"}"}(n.mapValue):x()}function Hs(n){return!!n&&"integerValue"in n}function Ii(n){return!!n&&"arrayValue"in n}function Pa(n){return!!n&&"nullValue"in n}function ba(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ss(n){return!!n&&"mapValue"in n}function Vg(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function An(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return $r(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=An(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=An(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Lg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.value=e}static empty(){return new De({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ss(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=An(t)}setAll(e){let t=Te.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=An(a):s.push(l.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());Ss(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ve(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ss(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){$r(t,(s,o)=>e[s]=o);for(const s of r)delete e[s]}clone(){return new De(An(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,t,r,s,o,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(e){return new ye(e,0,F.min(),F.min(),F.min(),De.empty(),0)}static newFoundDocument(e,t,r,s){return new ye(e,1,t,F.min(),r,s,0)}static newNoDocument(e,t){return new ye(e,2,t,F.min(),F.min(),De.empty(),0)}static newUnknownDocument(e,t){return new ye(e,3,t,F.min(),F.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ye&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ye(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.position=e,this.inclusive=t}}function ka(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],a=n.position[s];if(o.field.isKeyField()?r=V.comparator(V.fromName(a.referenceValue),t.key):r=Ht(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Da(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ve(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t="asc"){this.field=e,this.dir=t}}function Mg(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{}class oe extends fl{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new xg(e,t,r):t==="array-contains"?new $g(e,r):t==="in"?new jg(e,r):t==="not-in"?new qg(e,r):t==="array-contains-any"?new Hg(e,r):new oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ug(e,r):new Bg(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ht(t,this.value)):t!==null&&Ct(this.value)===Ct(t)&&this.matchesComparison(Ht(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Le extends fl{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Le(e,t)}matches(e){return pl(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function pl(n){return n.op==="and"}function gl(n){return Fg(n)&&pl(n)}function Fg(n){for(const e of n.filters)if(e instanceof Le)return!1;return!0}function Ws(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+Wt(n.value);if(gl(n))return n.filters.map(e=>Ws(e)).join(",");{const e=n.filters.map(t=>Ws(t)).join(",");return`${n.op}(${e})`}}function ml(n,e){return n instanceof oe?function(r,s){return s instanceof oe&&r.op===s.op&&r.field.isEqual(s.field)&&Ve(r.value,s.value)}(n,e):n instanceof Le?function(r,s){return s instanceof Le&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&ml(a,s.filters[l]),!0):!1}(n,e):void x()}function _l(n){return n instanceof oe?function(t){return`${t.field.canonicalString()} ${t.op} ${Wt(t.value)}`}(n):n instanceof Le?function(t){return t.op.toString()+" {"+t.getFilters().map(_l).join(" ,")+"}"}(n):"Filter"}class xg extends oe{constructor(e,t,r){super(e,t,r),this.key=V.fromName(r.referenceValue)}matches(e){const t=V.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ug extends oe{constructor(e,t){super(e,"in",t),this.keys=yl("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Bg extends oe{constructor(e,t){super(e,"not-in",t),this.keys=yl("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function yl(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>V.fromName(r.referenceValue))}class $g extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ii(t)&&On(t.arrayValue,this.value)}}class jg extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&On(this.value.arrayValue,t)}}class qg extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(On(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!On(this.value.arrayValue,t)}}class Hg extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ii(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>On(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e,t=null,r=[],s=[],o=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.ue=null}}function Na(n,e=null,t=[],r=[],s=null,o=null,a=null){return new Wg(n,e,t,r,s,o,a)}function wi(n){const e=B(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ws(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Br(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Wt(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Wt(r)).join(",")),e.ue=t}return e.ue}function Ai(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Mg(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ml(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Da(n.startAt,e.startAt)&&Da(n.endAt,e.endAt)}function zs(n){return V.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function zg(n,e,t,r,s,o,a,l){return new jr(n,e,t,r,s,o,a,l)}function Ri(n){return new jr(n)}function Oa(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Gg(n){return n.collectionGroup!==null}function Rn(n){const e=B(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ue(Te.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new br(o,r))}),t.has(Te.keyField().canonicalString())||e.ce.push(new br(Te.keyField(),r))}return e.ce}function Oe(n){const e=B(n);return e.le||(e.le=Kg(e,Rn(n))),e.le}function Kg(n,e){if(n.limitType==="F")return Na(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new br(s.field,o)});const t=n.endAt?new Pr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Pr(n.startAt.position,n.startAt.inclusive):null;return Na(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Gs(n,e,t){return new jr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function qr(n,e){return Ai(Oe(n),Oe(e))&&n.limitType===e.limitType}function El(n){return`${wi(Oe(n))}|lt:${n.limitType}`}function Nt(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>_l(s)).join(", ")}]`),Br(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Wt(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Wt(s)).join(",")),`Target(${r})`}(Oe(n))}; limitType=${n.limitType})`}function Hr(n,e){return e.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):V.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(const o of Rn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,h){const f=ka(a,l,h);return a.inclusive?f<=0:f<0}(r.startAt,Rn(r),s)||r.endAt&&!function(a,l,h){const f=ka(a,l,h);return a.inclusive?f>=0:f>0}(r.endAt,Rn(r),s))}(n,e)}function Qg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function vl(n){return(e,t)=>{let r=!1;for(const s of Rn(n)){const o=Jg(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Jg(n,e,t){const r=n.field.isKeyField()?V.comparator(e.key,t.key):function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Ht(h,f):x()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){$r(this.inner,(t,r)=>{for(const[s,o]of r)e(s,o)})}isEmpty(){return Dg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg=new se(V.comparator);function ut(){return Yg}const Tl=new se(V.comparator);function Tn(...n){let e=Tl;for(const t of n)e=e.insert(t.key,t);return e}function Xg(n){let e=Tl;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Et(){return Sn()}function Il(){return Sn()}function Sn(){return new Yt(n=>n.toString(),(n,e)=>n.isEqual(e))}const Zg=new ue(V.comparator);function j(...n){let e=Zg;for(const t of n)e=e.add(t);return e}const em=new ue(H);function tm(){return em}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:js(e)?"-0":e}}function rm(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(){this._=void 0}}function sm(n,e,t){return n instanceof Ks?function(s,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&vi(o)&&(o=Ti(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof kr?wl(n,e):n instanceof Dr?Al(n,e):function(s,o){const a=om(s,o),l=Va(a)+Va(s.Pe);return Hs(a)&&Hs(s.Pe)?rm(l):nm(s.serializer,l)}(n,e)}function im(n,e,t){return n instanceof kr?wl(n,e):n instanceof Dr?Al(n,e):t}function om(n,e){return n instanceof Qs?function(r){return Hs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class Ks extends Wr{}class kr extends Wr{constructor(e){super(),this.elements=e}}function wl(n,e){const t=Rl(e);for(const r of n.elements)t.some(s=>Ve(s,r))||t.push(r);return{arrayValue:{values:t}}}class Dr extends Wr{constructor(e){super(),this.elements=e}}function Al(n,e){let t=Rl(e);for(const r of n.elements)t=t.filter(s=>!Ve(s,r));return{arrayValue:{values:t}}}class Qs extends Wr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Va(n){return re(n.integerValue||n.doubleValue)}function Rl(n){return Ii(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function am(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof kr&&s instanceof kr||r instanceof Dr&&s instanceof Dr?qt(r.elements,s.elements,Ve):r instanceof Qs&&s instanceof Qs?Ve(r.Pe,s.Pe):r instanceof Ks&&s instanceof Ks}(n.transform,e.transform)}class It{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new It}static exists(e){return new It(void 0,e)}static updateTime(e){return new It(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Er(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Si{}function Sl(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new lm(n.key,It.none()):new Ci(n.key,n.data,It.none());{const t=n.data,r=De.empty();let s=new ue(Te.comparator);for(let o of e.fields)if(!s.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new zr(n.key,r,new rt(s.toArray()),It.none())}}function cm(n,e,t){n instanceof Ci?function(s,o,a){const l=s.value.clone(),h=Ma(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof zr?function(s,o,a){if(!Er(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Ma(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Cl(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Cn(n,e,t,r){return n instanceof Ci?function(o,a,l,h){if(!Er(o.precondition,a))return l;const f=o.value.clone(),g=Fa(o.fieldTransforms,h,a);return f.setAll(g),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof zr?function(o,a,l,h){if(!Er(o.precondition,a))return l;const f=Fa(o.fieldTransforms,h,a),g=a.data;return g.setAll(Cl(o)),g.setAll(f),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(w=>w.field))}(n,e,t,r):function(o,a,l){return Er(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function La(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qt(r,s,(o,a)=>am(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ci extends Si{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class zr extends Si{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Cl(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Ma(n,e,t){const r=new Map;ee(n.length===t.length);for(let s=0;s<t.length;s++){const o=n[s],a=o.transform,l=e.data.field(o.field);r.set(o.field,im(a,l,t[s]))}return r}function Fa(n,e,t){const r=new Map;for(const s of n){const o=s.transform,a=t.data.field(s.field);r.set(s.field,sm(o,a,e))}return r}class lm extends Si{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&cm(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Cn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Cn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Il();return this.mutations.forEach(s=>{const o=e.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=t.has(s.key)?null:l;const h=Sl(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),j())}isEqual(e){return this.batchId===e.batchId&&qt(this.mutations,e.mutations,(t,r)=>La(t,r))&&qt(this.baseMutations,e.baseMutations,(t,r)=>La(t,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie,U;function Pl(n){if(n===void 0)return ze("GRPC error has no .code"),b.UNKNOWN;switch(n){case ie.OK:return b.OK;case ie.CANCELLED:return b.CANCELLED;case ie.UNKNOWN:return b.UNKNOWN;case ie.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ie.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ie.INTERNAL:return b.INTERNAL;case ie.UNAVAILABLE:return b.UNAVAILABLE;case ie.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ie.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ie.NOT_FOUND:return b.NOT_FOUND;case ie.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ie.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ie.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ie.ABORTED:return b.ABORTED;case ie.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ie.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ie.DATA_LOSS:return b.DATA_LOSS;default:return x()}}(U=ie||(ie={}))[U.OK=0]="OK",U[U.CANCELLED=1]="CANCELLED",U[U.UNKNOWN=2]="UNKNOWN",U[U.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",U[U.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",U[U.NOT_FOUND=5]="NOT_FOUND",U[U.ALREADY_EXISTS=6]="ALREADY_EXISTS",U[U.PERMISSION_DENIED=7]="PERMISSION_DENIED",U[U.UNAUTHENTICATED=16]="UNAUTHENTICATED",U[U.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",U[U.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",U[U.ABORTED=10]="ABORTED",U[U.OUT_OF_RANGE=11]="OUT_OF_RANGE",U[U.UNIMPLEMENTED=12]="UNIMPLEMENTED",U[U.INTERNAL=13]="INTERNAL",U[U.UNAVAILABLE=14]="UNAVAILABLE",U[U.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm=new vt([4294967295,4294967295],0);function xa(n){const e=fm().encode(n),t=new sl;return t.update(e),new Uint8Array(t.digest())}function Ua(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new vt([t,r],0),new vt([s,o],0)]}class Pi{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new In(`Invalid padding: ${t}`);if(r<0)throw new In(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new In(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new In(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=vt.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(vt.fromNumber(r)));return s.compare(pm)===1&&(s=new vt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=xa(e),[r,s]=Ua(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new Pi(o,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=xa(e),[r,s]=Ua(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class In extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,r,s,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,$n.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Gr(F.min(),s,new se(H),ut(),j())}}class $n{constructor(e,t,r,s,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new $n(r,t,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class bl{constructor(e,t){this.targetId=e,this.me=t}}class kl{constructor(e,t,r=he.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Ba{constructor(){this.fe=0,this.ge=ja(),this.pe=he.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=j(),t=j(),r=j();return this.ge.forEach((s,o)=>{switch(o){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:x()}}),new $n(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=ja()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ee(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class gm{constructor(e){this.Le=e,this.Be=new Map,this.ke=ut(),this.qe=$a(),this.Qe=new se(H)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:x()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const o=s.target;if(zs(o))if(r===0){const a=new V(o.path);this.Ue(t,a,ye.newNoDocument(a,F.min()))}else ee(r===1);else{const a=this.Ye(t);if(a!==r){const l=this.Ze(e),h=l?this.Xe(l,e,a):1;if(h!==0){this.je(t);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,f)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=t;let a,l;try{a=St(r).toUint8Array()}catch(h){if(h instanceof dl)return jt("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Pi(a,s,o)}catch(h){return jt(h instanceof In?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.Ie===0?null:l}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(o=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,o,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((o,a)=>{const l=this.Je(a);if(l){if(o.current&&zs(l.target)){const h=new V(l.target.path);this.ke.get(h)!==null||this.it(a,h)||this.Ue(a,h,ye.newNoDocument(h,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let r=j();this.qe.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const s=new Gr(e,t,this.Qe,this.ke,r);return this.ke=ut(),this.qe=$a(),this.Qe=new se(H),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Ba,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ue(H),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Ba),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function $a(){return new se(V.comparator)}function ja(){return new se(V.comparator)}const mm={asc:"ASCENDING",desc:"DESCENDING"},_m={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ym={and:"AND",or:"OR"};class Em{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Js(n,e){return n.useProto3Json||Br(e)?e:{value:e}}function vm(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Tm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function xt(n){return ee(!!n),F.fromTimestamp(function(t){const r=lt(t);return new we(r.seconds,r.nanos)}(n))}function Im(n,e){return Ys(n,e).canonicalString()}function Ys(n,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Dl(n){const e=Z.fromString(n);return ee(Ml(e)),e}function Cs(n,e){const t=Dl(e);if(t.get(1)!==n.databaseId.projectId)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new V(Ol(t))}function Nl(n,e){return Im(n.databaseId,e)}function wm(n){const e=Dl(n);return e.length===4?Z.emptyPath():Ol(e)}function qa(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ol(n){return ee(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Am(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:x()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],o=function(f,g){return f.useProto3Json?(ee(g===void 0||typeof g=="string"),he.fromBase64String(g||"")):(ee(g===void 0||g instanceof Buffer||g instanceof Uint8Array),he.fromUint8Array(g||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(f){const g=f.code===void 0?b.UNKNOWN:Pl(f.code);return new O(g,f.message||"")}(a);t=new kl(r,s,o,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Cs(n,r.document.name),o=xt(r.document.updateTime),a=r.document.createTime?xt(r.document.createTime):F.min(),l=new De({mapValue:{fields:r.document.fields}}),h=ye.newFoundDocument(s,o,a,l),f=r.targetIds||[],g=r.removedTargetIds||[];t=new vr(f,g,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Cs(n,r.document),o=r.readTime?xt(r.readTime):F.min(),a=ye.newNoDocument(s,o),l=r.removedTargetIds||[];t=new vr([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Cs(n,r.document),o=r.removedTargetIds||[];t=new vr([],o,s,null)}else{if(!("filter"in e))return x();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new dm(s,o),l=r.targetId;t=new bl(l,a)}}return t}function Rm(n,e){return{documents:[Nl(n,e.path)]}}function Sm(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Nl(n,s);const o=function(f){if(f.length!==0)return Ll(Le.create(f,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(g=>function(R){return{field:Ot(R.field),direction:bm(R.dir)}}(g))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Js(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{_t:t,parent:s}}function Cm(n){let e=wm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ee(r===1);const g=t.from[0];g.allDescendants?s=g.collectionId:e=e.child(g.collectionId)}let o=[];t.where&&(o=function(w){const R=Vl(w);return R instanceof Le&&gl(R)?R.getFilters():[R]}(t.where));let a=[];t.orderBy&&(a=function(w){return w.map(R=>function(k){return new br(Vt(k.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(R))}(t.orderBy));let l=null;t.limit&&(l=function(w){let R;return R=typeof w=="object"?w.value:w,Br(R)?null:R}(t.limit));let h=null;t.startAt&&(h=function(w){const R=!!w.before,C=w.values||[];return new Pr(C,R)}(t.startAt));let f=null;return t.endAt&&(f=function(w){const R=!w.before,C=w.values||[];return new Pr(C,R)}(t.endAt)),zg(e,s,a,o,l,"F",h,f)}function Pm(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vl(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Vt(t.unaryFilter.field);return oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Vt(t.unaryFilter.field);return oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Vt(t.unaryFilter.field);return oe.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Vt(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return x()}}(n):n.fieldFilter!==void 0?function(t){return oe.create(Vt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return x()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Le.create(t.compositeFilter.filters.map(r=>Vl(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x()}}(t.compositeFilter.op))}(n):x()}function bm(n){return mm[n]}function km(n){return _m[n]}function Dm(n){return ym[n]}function Ot(n){return{fieldPath:n.canonicalString()}}function Vt(n){return Te.fromServerFormat(n.fieldPath)}function Ll(n){return n instanceof oe?function(t){if(t.op==="=="){if(ba(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NAN"}};if(Pa(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ba(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NOT_NAN"}};if(Pa(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ot(t.field),op:km(t.op),value:t.value}}}(n):n instanceof Le?function(t){const r=t.getFilters().map(s=>Ll(s));return r.length===1?r[0]:{compositeFilter:{op:Dm(t.op),filters:r}}}(n):x()}function Ml(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,t,r,s,o=F.min(),a=F.min(),l=he.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(e){return new st(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(e){this.ct=e}}function Om(n){const e=Cm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Gs(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(){this.un=new Lm}addToCollectionParentIndex(e,t){return this.un.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(ct.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(ct.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class Lm{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ue(Z.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ue(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new zt(0)}static kn(){return new zt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(){this.changes=new Yt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ye.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Cn(r.mutation,s,rt.empty(),we.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,j()).next(()=>r))}getLocalViewOfDocuments(e,t,r=j()){const s=Et();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let a=Tn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Et();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,j()))}populateOverlays(e,t,r){const s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let o=ut();const a=Sn(),l=function(){return Sn()}();return t.forEach((h,f)=>{const g=r.get(f.key);s.has(f.key)&&(g===void 0||g.mutation instanceof zr)?o=o.insert(f.key,f):g!==void 0?(a.set(f.key,g.mutation.getFieldMask()),Cn(g.mutation,f,g.mutation.getFieldMask(),we.now())):a.set(f.key,rt.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((f,g)=>a.set(f,g)),t.forEach((f,g)=>{var w;return l.set(f,new Fm(g,(w=a.get(f))!==null&&w!==void 0?w:null))}),l))}recalculateAndSaveOverlays(e,t){const r=Sn();let s=new se((a,l)=>a-l),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(h=>{const f=t.get(h);if(f===null)return;let g=r.get(h)||rt.empty();g=l.applyToLocalView(f,g),r.set(h,g);const w=(s.get(l.batchId)||j()).add(h);s=s.insert(l.batchId,w)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,g=h.value,w=Il();g.forEach(R=>{if(!o.has(R)){const C=Sl(t.get(R),r.get(R));C!==null&&w.set(R,C),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,w))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return V.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Gg(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):S.resolve(Et());let l=-1,h=o;return a.next(f=>S.forEach(f,(g,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),o.get(g)?S.resolve():this.remoteDocumentCache.getEntry(e,g).next(R=>{h=h.insert(g,R)}))).next(()=>this.populateOverlays(e,f,o)).next(()=>this.computeViews(e,h,f,j())).next(g=>({batchId:l,changes:Xg(g)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next(r=>{let s=Tn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let a=Tn();return this.indexManager.getCollectionParents(e,o).next(l=>S.forEach(l,h=>{const f=function(w,R){return new jr(R,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(g=>{g.forEach((w,R)=>{a=a.insert(w,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(a=>{o.forEach((h,f)=>{const g=f.getKey();a.get(g)===null&&(a=a.insert(g,ye.newInvalidDocument(g)))});let l=Tn();return a.forEach((h,f)=>{const g=o.get(h);g!==void 0&&Cn(g.mutation,f,rt.empty(),we.now()),Hr(t,f)&&(l=l.insert(h,f))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return S.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:xt(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:Om(s.bundledQuery),readTime:xt(s.readTime)}}(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(){this.overlays=new se(V.comparator),this.Ir=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Et();return S.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=Et(),o=t.length+1,a=new V(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new se((f,g)=>f-g);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let g=o.get(f.largestBatchId);g===null&&(g=Et(),o=o.insert(f.largestBatchId,g)),g.set(f.getKey(),f)}}const l=Et(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,g)=>l.set(f,g)),!(l.size()>=s)););return S.resolve(l)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new hm(t,r));let o=this.Ir.get(t);o===void 0&&(o=j(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(){this.sessionToken=he.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.Tr=new ue(ae.Er),this.dr=new ue(ae.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ae(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ae(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new V(new Z([])),r=new ae(t,e),s=new ae(t,e+1),o=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new V(new Z([])),r=new ae(t,e),s=new ae(t,e+1);let o=j();return this.dr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new ae(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ae{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return V.comparator(e.key,t.key)||H(e.wr,t.wr)}static Ar(e,t){return H(e.wr,t.wr)||V.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ue(ae.Er)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new um(o,t,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new ae(l.key,o)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ae(t,0),s=new ae(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ue(H);return t.forEach(s=>{const o=new ae(s,0),a=new ae(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],l=>{r=r.add(l.wr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;V.isDocumentKey(o)||(o=o.child(""));const a=new ae(new V(o),0);let l=new ue(H);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.wr)),!0)},a),S.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ee(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return S.forEach(t.mutations,s=>{const o=new ae(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ae(t,0),s=this.br.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e){this.Mr=e,this.docs=function(){return new se(V.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():ye.newInvalidDocument(t))}getEntries(e,t){let r=ut();return t.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():ye.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=ut();const a=t.path,l=new V(a.child("")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:g}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||Cg(Sg(g),r)<=0||(s.has(g.key)||Hr(t,g))&&(o=o.insert(g.key,g.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,s){x()}Or(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Hm(this)}getSize(e){return S.resolve(this.size)}}class Hm extends Mm{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e){this.persistence=e,this.Nr=new Yt(t=>wi(t),Ai),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.Lr=0,this.Br=new bi,this.targetCount=0,this.kr=zt.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),S.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new zt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Kn(t),S.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(a=>{o.push(s.markPotentiallyOrphaned(e,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Ei(0),this.Kr=!1,this.Kr=!0,this.$r=new $m,this.referenceDelegate=e(this),this.Ur=new Wm(this),this.indexManager=new Vm,this.remoteDocumentCache=function(s){return new qm(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Nm(t),this.Gr=new Um(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Bm,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new jm(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);const s=new Gm(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return S.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Gm extends bg{constructor(e){super(),this.currentSequenceNumber=e}}class ki{constructor(e){this.persistence=e,this.Jr=new bi,this.Yr=null}static Zr(e){return new ki(e)}get Xr(){if(this.Yr)return this.Yr;throw x()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),S.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,r=>{const s=V.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,F.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return S.or([()=>S.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=j(),s=j();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Di(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return sg()?8:kg(ng())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Km;return this.Xi(e,t,a).next(l=>{if(o.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(_n()<=$.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Nt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(_n()<=$.DEBUG&&D("QueryEngine","Query:",Nt(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(_n()<=$.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Nt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Oe(t))):S.resolve())}Yi(e,t){if(Oa(t))return S.resolve(null);let r=Oe(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Gs(t,null,"F"),r=Oe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=j(...o);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(h=>{const f=this.ts(t,l);return this.ns(t,f,a,h.readTime)?this.Yi(e,Gs(t,null,"F")):this.rs(e,f,t,h)}))})))}Zi(e,t,r,s){return Oa(t)||s.isEqual(F.min())?S.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const a=this.ts(t,o);return this.ns(t,a,r,s)?S.resolve(null):(_n()<=$.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Nt(t)),this.rs(e,a,t,Rg(s,-1)).next(l=>l))})}ts(e,t){let r=new ue(vl(e));return t.forEach((s,o)=>{Hr(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return _n()<=$.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Nt(t)),this.Ji.getDocumentsMatchingQuery(e,t,ct.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new se(H),this._s=new Yt(o=>wi(o),Ai),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new xm(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Ym(n,e,t,r){return new Jm(n,e,t,r)}async function Fl(n,e){const t=B(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=j();for(const f of s){a.push(f.batchId);for(const g of f.mutations)h=h.add(g.key)}for(const f of o){l.push(f.batchId);for(const g of f.mutations)h=h.add(g.key)}return t.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:a,addedBatchIds:l}))})})}function xl(n){const e=B(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Xm(n,e){const t=B(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((g,w)=>{const R=s.get(w);if(!R)return;l.push(t.Ur.removeMatchingKeys(o,g.removedDocuments,w).next(()=>t.Ur.addMatchingKeys(o,g.addedDocuments,w)));let C=R.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(w)!==null?C=C.withResumeToken(he.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):g.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(g.resumeToken,r)),s=s.insert(w,C),function(M,N,Y){return M.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=3e8?!0:Y.addedDocuments.size+Y.modifiedDocuments.size+Y.removedDocuments.size>0}(R,C,g)&&l.push(t.Ur.updateTargetData(o,C))});let h=ut(),f=j();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(o,g))}),l.push(Zm(o,a,e.documentUpdates).next(g=>{h=g.Ps,f=g.Is})),!r.isEqual(F.min())){const g=t.Ur.getLastRemoteSnapshotVersion(o).next(w=>t.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(g)}return S.waitFor(l).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(t.os=s,o))}function Zm(n,e,t){let r=j(),s=j();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=ut();return t.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(F.min())?(e.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(h),a=a.insert(l,h)):D("LocalStore","Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Ps:a,Is:s}})}function e_(n,e){const t=B(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(o=>o?(s=o,S.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new st(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function Xs(n,e,t){const r=B(n),s=r.os.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Bn(a))throw a;D("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Ha(n,e,t){const r=B(n);let s=F.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,g){const w=B(h),R=w._s.get(g);return R!==void 0?S.resolve(w.os.get(R)):w.Ur.getTargetData(f,g)}(r,a,Oe(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:F.min(),t?o:j())).next(l=>(t_(r,Qg(e),l),{documents:l,Ts:o})))}function t_(n,e,t){let r=n.us.get(e)||F.min();t.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(e,r)}class Wa{constructor(){this.activeTargetIds=tm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class n_{constructor(){this.so=new Wa,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Wa,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){D("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){D("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fr=null;function Ps(){return fr===null?fr=function(){return 268435456+Math.round(2147483648*Math.random())}():fr++,"0x"+fr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const me="WebChannelConnection";class o_ extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,a){const l=Ps(),h=this.xo(t,r.toUriEncodedString());D("RestConnection",`Sending RPC '${t}' ${l}:`,h,s);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,a),this.No(t,h,f,s).then(g=>(D("RestConnection",`Received RPC '${t}' ${l}: `,g),g),g=>{throw jt("RestConnection",`RPC '${t}' ${l} failed with error: `,g,"url: ",h,"request:",s),g})}Lo(t,r,s,o,a,l){return this.Mo(t,r,s,o,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Jt}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),s&&s.headers.forEach((o,a)=>t[a]=o)}xo(t,r){const s=s_[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const o=Ps();return new Promise((a,l)=>{const h=new il;h.setWithCredentials(!0),h.listenOnce(ol.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case yr.NO_ERROR:const g=h.getResponseJson();D(me,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(g)),a(g);break;case yr.TIMEOUT:D(me,`RPC '${e}' ${o} timed out`),l(new O(b.DEADLINE_EXCEEDED,"Request time out"));break;case yr.HTTP_ERROR:const w=h.getStatus();if(D(me,`RPC '${e}' ${o} failed with status:`,w,"response text:",h.getResponseText()),w>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R==null?void 0:R.error;if(C&&C.status&&C.message){const k=function(N){const Y=N.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(Y)>=0?Y:b.UNKNOWN}(C.status);l(new O(k,C.message))}else l(new O(b.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new O(b.UNAVAILABLE,"Connection failed."));break;default:x()}}finally{D(me,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);D(me,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,r,15)})}Bo(e,t,r){const s=Ps(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ll(),l=cl(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const g=o.join("");D(me,`Creating RPC '${e}' stream ${s}: ${g}`,h);const w=a.createWebChannel(g,h);let R=!1,C=!1;const k=new i_({Io:N=>{C?D(me,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(R||(D(me,`Opening RPC '${e}' stream ${s} transport.`),w.open(),R=!0),D(me,`RPC '${e}' stream ${s} sending:`,N),w.send(N))},To:()=>w.close()}),M=(N,Y,K)=>{N.listen(Y,G=>{try{K(G)}catch(te){setTimeout(()=>{throw te},0)}})};return M(w,vn.EventType.OPEN,()=>{C||(D(me,`RPC '${e}' stream ${s} transport opened.`),k.yo())}),M(w,vn.EventType.CLOSE,()=>{C||(C=!0,D(me,`RPC '${e}' stream ${s} transport closed`),k.So())}),M(w,vn.EventType.ERROR,N=>{C||(C=!0,jt(me,`RPC '${e}' stream ${s} transport errored:`,N),k.So(new O(b.UNAVAILABLE,"The operation could not be completed")))}),M(w,vn.EventType.MESSAGE,N=>{var Y;if(!C){const K=N.data[0];ee(!!K);const G=K,te=G.error||((Y=G[0])===null||Y===void 0?void 0:Y.error);if(te){D(me,`RPC '${e}' stream ${s} received error:`,te);const Re=te.status;let ne=function(_){const y=ie[_];if(y!==void 0)return Pl(y)}(Re),E=te.message;ne===void 0&&(ne=b.INTERNAL,E="Unknown error status: "+Re+" with message "+te.message),C=!0,k.So(new O(ne,E)),w.close()}else D(me,`RPC '${e}' stream ${s} received:`,K),k.bo(K)}}),M(l,al.STAT_EVENT,N=>{N.stat===$s.PROXY?D(me,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===$s.NOPROXY&&D(me,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function bs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n){return new Em(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{constructor(e,t,r,s,o,a,l,h){this.ui=e,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Bl(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(ze(t.toString()),ze("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new O(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return D("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(D("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class c_ extends a_{constructor(e,t,r,s,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=Am(this.serializer,e),r=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?xt(a.readTime):F.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=qa(this.serializer),t.addTarget=function(o,a){let l;const h=a.target;if(l=zs(h)?{documents:Rm(o,h)}:{query:Sm(o,h)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Tm(o,a.resumeToken);const f=Js(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(F.min())>0){l.readTime=vm(o,a.snapshotVersion.toTimestamp());const f=Js(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,e);const r=Pm(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=qa(this.serializer),t.removeTarget=e,this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_ extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,Ys(t,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(b.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,Ys(t,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(b.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class u_{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ze(t),this.D_=!1):D("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{r.enqueueAndForget(async()=>{qn(this)&&(D("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=B(h);f.L_.add(4),await jn(f),f.q_.set("Unknown"),f.L_.delete(4),await Kr(f)}(this))})}),this.q_=new u_(r,s)}}async function Kr(n){if(qn(n))for(const e of n.B_)await e(!0)}async function jn(n){for(const e of n.B_)await e(!1)}function $l(n,e){const t=B(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Li(t)?Vi(t):Xt(t).r_()&&Oi(t,e))}function Ni(n,e){const t=B(n),r=Xt(t);t.N_.delete(e),r.r_()&&jl(t,e),t.N_.size===0&&(r.r_()?r.o_():qn(t)&&t.q_.set("Unknown"))}function Oi(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Xt(n).A_(e)}function jl(n,e){n.Q_.xe(e),Xt(n).R_(e)}function Vi(n){n.Q_=new gm({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Xt(n).start(),n.q_.v_()}function Li(n){return qn(n)&&!Xt(n).n_()&&n.N_.size>0}function qn(n){return B(n).L_.size===0}function ql(n){n.Q_=void 0}async function d_(n){n.q_.set("Online")}async function f_(n){n.N_.forEach((e,t)=>{Oi(n,e)})}async function p_(n,e){ql(n),Li(n)?(n.q_.M_(e),Vi(n)):n.q_.set("Unknown")}async function g_(n,e,t){if(n.q_.set("Online"),e instanceof kl&&e.state===2&&e.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(r){D("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ga(n,r)}else if(e instanceof vr?n.Q_.Ke(e):e instanceof bl?n.Q_.He(e):n.Q_.We(e),!t.isEqual(F.min()))try{const r=await xl(n.localStore);t.compareTo(r)>=0&&await function(o,a){const l=o.Q_.rt(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const g=o.N_.get(f);g&&o.N_.set(f,g.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{const g=o.N_.get(h);if(!g)return;o.N_.set(h,g.withResumeToken(he.EMPTY_BYTE_STRING,g.snapshotVersion)),jl(o,h);const w=new st(g.target,h,f,g.sequenceNumber);Oi(o,w)}),o.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){D("RemoteStore","Failed to raise snapshot:",r),await Ga(n,r)}}async function Ga(n,e,t){if(!Bn(e))throw e;n.L_.add(1),await jn(n),n.q_.set("Offline"),t||(t=()=>xl(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Kr(n)})}async function Ka(n,e){const t=B(n);t.asyncQueue.verifyOperationInProgress(),D("RemoteStore","RemoteStore received new credentials");const r=qn(t);t.L_.add(3),await jn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Kr(t)}async function m_(n,e){const t=B(n);e?(t.L_.delete(2),await Kr(t)):e||(t.L_.add(2),await jn(t),t.q_.set("Unknown"))}function Xt(n){return n.K_||(n.K_=function(t,r,s){const o=B(t);return o.w_(),new c_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:d_.bind(null,n),Ro:f_.bind(null,n),mo:p_.bind(null,n),d_:g_.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Li(n)?Vi(n):n.q_.set("Unknown")):(await n.K_.stop(),ql(n))})),n.K_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Tt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const a=Date.now()+r,l=new Mi(e,t,a,s,o);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hl(n,e){if(ze("AsyncQueue",`${e}: ${n}`),Bn(n))return new O(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this.comparator=e?(t,r)=>e(t,r)||V.comparator(t.key,r.key):(t,r)=>V.comparator(t.key,r.key),this.keyedMap=Tn(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new Ut(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ut)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Ut;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.W_=new se(V.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):x():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Gt{constructor(e,t,r,s,o,a,l,h,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,s,o){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Gt(e,t,Ut.emptySet(t),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&qr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class y_{constructor(){this.queries=Ja(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=B(t),o=s.queries;s.queries=Ja(),o.forEach((a,l)=>{for(const h of l.j_)h.onError(r)})})(this,new O(b.ABORTED,"Firestore shutting down"))}}function Ja(){return new Yt(n=>El(n),qr)}async function E_(n,e){const t=B(n);let r=3;const s=e.query;let o=t.queries.get(s);o?!o.H_()&&e.J_()&&(r=2):(o=new __,r=e.J_()?0:1);try{switch(r){case 0:o.z_=await t.onListen(s,!0);break;case 1:o.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=Hl(a,`Initialization of query '${Nt(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,o),o.j_.push(e),e.Z_(t.onlineState),o.z_&&e.X_(o.z_)&&Fi(t)}async function v_(n,e){const t=B(n),r=e.query;let s=3;const o=t.queries.get(r);if(o){const a=o.j_.indexOf(e);a>=0&&(o.j_.splice(a,1),o.j_.length===0?s=e.J_()?0:1:!o.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function T_(n,e){const t=B(n);let r=!1;for(const s of e){const o=s.query,a=t.queries.get(o);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&Fi(t)}function I_(n,e,t){const r=B(n),s=r.queries.get(e);if(s)for(const o of s.j_)o.onError(t);r.queries.delete(e)}function Fi(n){n.Y_.forEach(e=>{e.next()})}var Zs,Ya;(Ya=Zs||(Zs={})).ea="default",Ya.Cache="cache";class w_{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Gt(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Gt.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Zs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e){this.key=e}}class zl{constructor(e){this.key=e}}class A_{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=j(),this.mutatedKeys=j(),this.Aa=vl(e),this.Ra=new Ut(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Qa,s=t?t.Ra:this.Ra;let o=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((g,w)=>{const R=s.get(g),C=Hr(this.query,w)?w:null,k=!!R&&this.mutatedKeys.has(R.key),M=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let N=!1;R&&C?R.data.isEqual(C.data)?k!==M&&(r.track({type:3,doc:C}),N=!0):this.ga(R,C)||(r.track({type:2,doc:C}),N=!0,(h&&this.Aa(C,h)>0||f&&this.Aa(C,f)<0)&&(l=!0)):!R&&C?(r.track({type:0,doc:C}),N=!0):R&&!C&&(r.track({type:1,doc:R}),N=!0,(h||f)&&(l=!0)),N&&(C?(a=a.add(C),o=M?o.add(g):o.delete(g)):(a=a.delete(g),o=o.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),o=o.delete(g.key),r.track({type:1,doc:g})}return{Ra:a,fa:r,ns:l,mutatedKeys:o}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const o=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((g,w)=>function(C,k){const M=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x()}};return M(C)-M(k)}(g.type,w.type)||this.Aa(g.doc,w.doc)),this.pa(r),s=s!=null&&s;const l=t&&!s?this.ya():[],h=this.da.size===0&&this.current&&!s?1:0,f=h!==this.Ea;return this.Ea=h,a.length!==0||f?{snapshot:new Gt(this.query,e.Ra,o,a,e.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Qa,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=j(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new zl(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Wl(r))}),t}ba(e){this.Ta=e.Ts,this.da=j();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Gt.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class R_{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class S_{constructor(e){this.key=e,this.va=!1}}class C_{constructor(e,t,r,s,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Yt(l=>El(l),qr),this.Ma=new Map,this.xa=new Set,this.Oa=new se(V.comparator),this.Na=new Map,this.La=new bi,this.Ba={},this.ka=new Map,this.qa=zt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function P_(n,e,t=!0){const r=Yl(n);let s;const o=r.Fa.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Da()):s=await Gl(r,e,t,!0),s}async function b_(n,e){const t=Yl(n);await Gl(t,e,!0,!1)}async function Gl(n,e,t,r){const s=await e_(n.localStore,Oe(e)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let l;return r&&(l=await k_(n,e,o,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&$l(n.remoteStore,s),l}async function k_(n,e,t,r,s){n.Ka=(w,R,C)=>async function(M,N,Y,K){let G=N.view.ma(Y);G.ns&&(G=await Ha(M.localStore,N.query,!1).then(({documents:E})=>N.view.ma(E,G)));const te=K&&K.targetChanges.get(N.targetId),Re=K&&K.targetMismatches.get(N.targetId)!=null,ne=N.view.applyChanges(G,M.isPrimaryClient,te,Re);return Za(M,N.targetId,ne.wa),ne.snapshot}(n,w,R,C);const o=await Ha(n.localStore,e,!0),a=new A_(e,o.Ts),l=a.ma(o.documents),h=$n.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);Za(n,t,f.wa);const g=new R_(e,t,a);return n.Fa.set(e,g),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),f.snapshot}async function D_(n,e,t){const r=B(n),s=r.Fa.get(e),o=r.Ma.get(s.targetId);if(o.length>1)return r.Ma.set(s.targetId,o.filter(a=>!qr(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Xs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ni(r.remoteStore,s.targetId),ei(r,s.targetId)}).catch(yi)):(ei(r,s.targetId),await Xs(r.localStore,s.targetId,!0))}async function N_(n,e){const t=B(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ni(t.remoteStore,r.targetId))}async function Kl(n,e){const t=B(n);try{const r=await Xm(t.localStore,e);e.targetChanges.forEach((s,o)=>{const a=t.Na.get(o);a&&(ee(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?ee(a.va):s.removedDocuments.size>0&&(ee(a.va),a.va=!1))}),await Jl(t,r,e)}catch(r){await yi(r)}}function Xa(n,e,t){const r=B(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((o,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=B(a);h.onlineState=l;let f=!1;h.queries.forEach((g,w)=>{for(const R of w.j_)R.Z_(l)&&(f=!0)}),f&&Fi(h)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function O_(n,e,t){const r=B(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),o=s&&s.key;if(o){let a=new se(V.comparator);a=a.insert(o,ye.newNoDocument(o,F.min()));const l=j().add(o),h=new Gr(F.min(),new Map,new se(H),a,l);await Kl(r,h),r.Oa=r.Oa.remove(o),r.Na.delete(e),xi(r)}else await Xs(r.localStore,e,!1).then(()=>ei(r,e,t)).catch(yi)}function ei(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||Ql(n,r)})}function Ql(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Ni(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),xi(n))}function Za(n,e,t){for(const r of t)r instanceof Wl?(n.La.addReference(r.key,e),V_(n,r)):r instanceof zl?(D("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Ql(n,r.key)):x()}function V_(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(D("SyncEngine","New document in limbo: "+t),n.xa.add(r),xi(n))}function xi(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new V(Z.fromString(e)),r=n.qa.next();n.Na.set(r,new S_(t)),n.Oa=n.Oa.insert(t,r),$l(n.remoteStore,new st(Oe(Ri(t.path)),r,"TargetPurposeLimboResolution",Ei.oe))}}async function Jl(n,e,t){const r=B(n),s=[],o=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,h)=>{a.push(r.Ka(h,e,t).then(f=>{var g;if((f||t)&&r.isPrimaryClient){const w=f?!f.fromCache:(g=t==null?void 0:t.targetChanges.get(h.targetId))===null||g===void 0?void 0:g.current;r.sharedClientState.updateQueryState(h.targetId,w?"current":"not-current")}if(f){s.push(f);const w=Di.Wi(h.targetId,f);o.push(w)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(h,f){const g=B(h);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>S.forEach(f,R=>S.forEach(R.$i,C=>g.persistence.referenceDelegate.addReference(w,R.targetId,C)).next(()=>S.forEach(R.Ui,C=>g.persistence.referenceDelegate.removeReference(w,R.targetId,C)))))}catch(w){if(!Bn(w))throw w;D("LocalStore","Failed to update sequence numbers: "+w)}for(const w of f){const R=w.targetId;if(!w.fromCache){const C=g.os.get(R),k=C.snapshotVersion,M=C.withLastLimboFreeSnapshotVersion(k);g.os=g.os.insert(R,M)}}}(r.localStore,o))}async function L_(n,e){const t=B(n);if(!t.currentUser.isEqual(e)){D("SyncEngine","User change. New user:",e.toKey());const r=await Fl(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(l=>{l.forEach(h=>{h.reject(new O(b.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Jl(t,r.hs)}}function M_(n,e){const t=B(n),r=t.Na.get(e);if(r&&r.va)return j().add(r.key);{let s=j();const o=t.Ma.get(e);if(!o)return s;for(const a of o){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function Yl(n){const e=B(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kl.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=M_.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=O_.bind(null,e),e.Ca.d_=T_.bind(null,e.eventManager),e.Ca.$a=I_.bind(null,e.eventManager),e}class Nr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ul(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Ym(this.persistence,new Qm,e.initialUser,this.serializer)}Ga(e){return new zm(ki.Zr,this.serializer)}Wa(e){return new n_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Nr.provider={build:()=>new Nr};class ti{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Xa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=L_.bind(null,this.syncEngine),await m_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new y_}()}createDatastore(e){const t=Ul(e.databaseInfo.databaseId),r=function(o){return new o_(o)}(e.databaseInfo);return function(o,a,l,h){return new l_(o,a,l,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,a,l){return new h_(r,s,o,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Xa(this.syncEngine,t,0),function(){return za.D()?new za:new r_}())}createSyncEngine(e,t){return function(s,o,a,l,h,f,g){const w=new C_(s,o,a,l,h,f);return g&&(w.Qa=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const o=B(s);D("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await jn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ti.provider={build:()=>new ti};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ze("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=_e.UNAUTHENTICATED,this.clientId=hl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{D("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(D("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Hl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ks(n,e){n.asyncQueue.verifyOperationInProgress(),D("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Fl(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function ec(n,e){n.asyncQueue.verifyOperationInProgress();const t=await U_(n);D("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ka(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ka(e.remoteStore,s)),n._onlineComponents=e}async function U_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D("FirestoreClient","Using user provided OfflineComponentProvider");try{await ks(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;jt("Error using user provided cache. Falling back to memory cache: "+t),await ks(n,new Nr)}}else D("FirestoreClient","Using default OfflineComponentProvider"),await ks(n,new Nr);return n._offlineComponents}async function B_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D("FirestoreClient","Using user provided OnlineComponentProvider"),await ec(n,n._uninitializedComponentsProvider._online)):(D("FirestoreClient","Using default OnlineComponentProvider"),await ec(n,new ti))),n._onlineComponents}async function $_(n){const e=await B_(n),t=e.eventManager;return t.onListen=P_.bind(null,e.syncEngine),t.onUnlisten=D_.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=b_.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=N_.bind(null,e.syncEngine),t}function j_(n,e,t={}){const r=new Tt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,f){const g=new F_({next:R=>{g.Za(),a.enqueueAndForget(()=>v_(o,w));const C=R.docs.has(l);!C&&R.fromCache?f.reject(new O(b.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&R.fromCache&&h&&h.source==="server"?f.reject(new O(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(R)},error:R=>f.reject(R)}),w=new w_(Ri(l.path),g,{includeMetadataChanges:!0,_a:!0});return E_(o,w)}(await $_(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q_(n,e,t){if(!t)throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function H_(n,e,t,r){if(e===!0&&r===!0)throw new O(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function nc(n){if(!V.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function W_(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x()}function ni(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=W_(n);throw new O(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}H_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Xl((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ui{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new mg;switch(r.type){case"firstParty":return new vg(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=tc.get(t);r&&(D("ComponentProvider","Removing Datastore"),tc.delete(t),r.terminate())}(this),Promise.resolve()}}function z_(n,e,t,r={}){var s;const o=(n=ni(n,Ui))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&jt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let l,h;if(typeof r.mockUserToken=="string")l=r.mockUserToken,h=_e.MOCK_USER;else{l=tg(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new _e(f)}n._authCredentials=new _g(new ul(l,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Bi(this.firestore,e,this._query)}}class qe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new qe(this.firestore,e,this._key)}}class Vn extends Bi{constructor(e,t,r){super(e,t,Ri(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new qe(this.firestore,null,new V(e))}withConverter(e){return new Vn(this.firestore,e,this._path)}}function Sy(n,e,...t){if(n=lg(n),arguments.length===1&&(e=hl.newId()),q_("doc","path",e),n instanceof Ui){const r=Z.fromString(e,...t);return nc(r),new qe(n,null,new V(r))}{if(!(n instanceof qe||n instanceof Vn))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return nc(r),new qe(n.firestore,n instanceof Vn?n.converter:null,new V(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Bl(this,"async_queue_retry"),this.Vu=()=>{const r=bs();r&&D("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=bs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=bs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Tt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Bn(e))throw e;D("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw ze("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=Mi.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&x()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Zl extends Ui{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new sc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new sc(e),this._firestoreClient=void 0,await e}}}function Cy(n,e){const t=typeof n=="object"?n:pc(),r=typeof n=="string"?n:"(default)",s=ii(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=eg("firestore");o&&z_(s,...o)}return s}function G_(n){if(n._terminated)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||K_(n),n._firestoreClient}function K_(n){var e,t,r;const s=n._freezeSettings(),o=function(l,h,f,g){return new Og(l,h,f,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,Xl(g.experimentalLongPollingOptions),g.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new x_(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Or(he.fromBase64String(e))}catch(t){throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Or(he.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,e._values)}}const Y_=new RegExp("[~\\*/\\[\\]]");function X_(n,e,t){if(e.search(Y_)>=0)throw ic(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new eu(...e.split("."))._internalPath}catch{throw ic(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function ic(n,e,t,r,s){let o=`Function ${e}() called with invalid data`;o+=". ";let a="";return new O(b.INVALID_ARGUMENT,o+n+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,t,r,s,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new qe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Z_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(nu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Z_ extends tu{data(){return super.data()}}function nu(n,e){return typeof e=="string"?X_(n,e):e instanceof eu?e._internalPath:e._delegate._internalPath}class ey{convertValue(e,t="none"){switch(Ct(e)){case 0:return null;case 1:return e.booleanValue;case 2:return re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(St(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return $r(e,(s,o)=>{r[s]=this.convertValue(o,t)}),r}convertVectorValue(e){var t,r,s;const o=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>re(a.doubleValue));return new J_(o)}convertGeoPoint(e){return new Q_(re(e.latitude),re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Ti(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Dn(e));default:return null}}convertTimestamp(e){const t=lt(e);return new we(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);ee(Ml(r));const s=new Nn(r.get(1),r.get(3)),o=new V(r.popFirst(5));return s.isEqual(t)||ze(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ru extends tu{constructor(e,t,r,s,o,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ny(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(nu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ny extends ru{data(e={}){return super.data(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Py(n){n=ni(n,qe);const e=ni(n.firestore,Zl);return j_(G_(e),n._key).then(t=>sy(e,n,t))}class ry extends ey{constructor(e){super(),this.firestore=e}convertBytes(e){return new Or(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new qe(this.firestore,null,t)}}function sy(n,e,t){const r=t.docs.get(e._key),s=new ry(n);return new ru(n,s,e._key,r,new ty(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Jt=s})(Kt),Bt(new ug("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Zl(new yg(r.getProvider("auth-internal")),new Ig(r.getProvider("app-check-internal")),function(f,g){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Nn(f.options.projectId,g)}(a,s),a);return o=Object.assign({useFetchStreams:t},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),at(wa,"4.7.3",e),at(wa,"4.7.3","esm2017")})();var iy="firebase",oy="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */at(iy,oy,"app");export{et as G,Cy as a,Py as b,gy as c,Sy as d,Ty as e,Ey as f,Iy as g,vy as h,Zh as i,yy as o,my as s,_y as u};
