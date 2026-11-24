function t(t,e,i,o){var a,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(n<3?a(r):n>3?a(e,i,r):a(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},s=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),a=e.litNonce;void 0!==a&&o.setAttribute("nonce",a),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const n=a.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,a){if(void 0!==t){const n=this.constructor;if(!1===o&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,f?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,A=t=>t,E=$.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+C,S=`<${F}>`,P=document,B=()=>P.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,O=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,U=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),R=W(1),V=W(2),q=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),G=new WeakMap,Z=P.createTreeWalker(P,129);function Y(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let s,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===N?"!--"===c[1]?r=j:void 0!==c[1]?r=H:void 0!==c[2]?(U.test(c[2])&&(a=RegExp("</"+c[2],"g")),r=O):void 0!==c[3]&&(r=O):r===O?">"===c[0]?(r=a??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,s=c[1],r=void 0===c[3]?O:'"'===c[3]?I:L):r===I||r===L?r=O:r===j||r===H?r=N:(r=O,a=void 0);const p=r===O&&t[e+1].startsWith("/>")?" ":"";n+=r===N?i+S:l>=0?(o.push(s),i.slice(0,l)+z+i.slice(l)+C+p):i+C+(-2===l?e:p)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,n=0;const r=t.length-1,s=this.parts,[c,l]=X(t,e);if(this.el=J.createElement(c,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Z.nextNode())&&s.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(z)){const e=l[n++],i=o.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ot:"?"===r[1]?at:"@"===r[1]?nt:it}),o.removeAttribute(t)}else t.startsWith(C)&&(s.push({type:6,index:a}),o.removeAttribute(t));if(U.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],B()),Z.nextNode(),s.push({type:2,index:++a});o.append(t[e],B())}}}else if(8===o.nodeType)if(o.data===F)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)s.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===q)return e;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const n=D(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(e=Q(t,a._$AS(t,e.values),a,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);Z.currentNode=o;let a=Z.nextNode(),n=0,r=0,s=i[0];for(;void 0!==s;){if(n===s.index){let e;2===s.type?e=new et(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new rt(a,this,t)),this._$AV.push(e),s=i[++r]}n!==s?.index&&(a=Z.nextNode(),n++)}return Z.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),D(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new et(this.O(B()),this.O(B()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,o){const a=this.strings;let n=!1;if(void 0===a)t=Q(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const o=t;let r,s;for(t=a[0],r=0;r<a.length-1;r++)s=Q(this,o[i+r],e,r),s===q&&(s=this._$AH[r]),n||=!D(s)||s!==this._$AH[r],s===K?t=K:t!==K&&(t+=(s??"")+a[r+1]),this._$AH[r]=s}n&&!o&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends it{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===q)return;const i=this._$AH,o=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==K&&(i===K||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(J,et),($.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let a=o._$litPart$;if(void 0===a){const t=i?.renderBefore??null;o._$litPart$=a=new et(e.insertBefore(B(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},ut=(t=ht,e,i)=>{const{kind:o,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,a,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];e.call(this,i),this.requestUpdate(o,a,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function _t(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return _t({...t,state:!0,attribute:!1})}const gt={en:{card:{no_source:"Configure a weather entity or custom sensors",unavailable:"Unavailable",unknown:"Unknown",sensor_only_no_forecast:"Forecast requires a weather entity",forecast_loading:"Loading forecast...",forecast_error:"Forecast unavailable"},conditions:{sunny:"Sunny","clear-night":"Clear night",partlycloudy:"Partly cloudy",cloudy:"Cloudy",rainy:"Rainy",pouring:"Pouring",lightning:"Thunderstorm","lightning-rainy":"Thunderstorm & rain",snowy:"Snowy","snowy-rainy":"Sleet",hail:"Hail",fog:"Foggy",windy:"Windy","windy-variant":"Windy & cloudy",exceptional:"Exceptional",unknown:"Unknown"},editor:{section_sources:"Data sources",section_layout:"Layout & background",section_visibility:"Visible elements",section_forecast:"Forecast",section_stats:"Custom stats (up to 3 slots)",section_actions:"Card interactions",entity:"Weather entity (optional)",entity_helper:"Provides condition, temperature, and forecast. Leave empty for sensor-only mode.",temperature_entity:"Temperature sensor (override or primary)",temperature_entity_helper:"Overrides weather temperature or sets primary temperature in sensor-only mode.",temperature_attribute:"Temperature attribute (optional)",condition_entity:"Condition sensor (optional)",condition_entity_helper:"Overrides weather condition using a custom sensor state.",name:"Custom name (optional)",orientation:"Orientation",orientation_horizontal:"Horizontal",orientation_vertical:"Vertical",background_mode:"Background style",background_dynamic:"Dynamic pastel (weather & day/night)",background_theme:"Home Assistant theme",background_transparent:"100% transparent",show_icon:"Show weather icon",show_temperature:"Show temperature",show_condition:"Show condition text",show_name:"Show name / location",show_stats:"Show custom stats",show_forecast:"Show forecast",forecast_type:"Forecast type",forecast_daily:"Daily",forecast_hourly:"Hourly",forecast_items:"Max forecast items (optional)",forecast_items_helper:"Leave empty to adapt automatically to card size.",forecast_requires_weather:"Select a weather entity above to enable forecast display.",stat_slot_1:"Stat slot 1",stat_slot_2:"Stat slot 2",stat_slot_3:"Stat slot 3",stat_entity:"Entity",stat_attribute:"Attribute (optional)",stat_label:"Short label (optional)",stat_icon:"Icon (optional)",stat_unit:"Custom unit (optional)",stat_tap_action:"Tap action",stat_double_tap_action:"Double tap action",stat_hold_action:"Hold action",tap_action:"Tap action",double_tap_action:"Double tap action",hold_action:"Hold action"}},es:{card:{no_source:"Configura una entidad de clima o sensores propios",unavailable:"No disponible",unknown:"Desconocido",sensor_only_no_forecast:"El pronóstico requiere una entidad weather",forecast_loading:"Cargando pronóstico...",forecast_error:"Pronóstico no disponible"},conditions:{sunny:"Soleado","clear-night":"Noche despejada",partlycloudy:"Parcialmente nublado",cloudy:"Nublado",rainy:"Lluvioso",pouring:"Lluvia intensa",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta con lluvia",snowy:"Nevando","snowy-rainy":"Aguanieve",hail:"Granizo",fog:"Niebla",windy:"Ventoso","windy-variant":"Viento y nubes",exceptional:"Excepcional",unknown:"Desconocido"},editor:{section_sources:"Fuentes de datos",section_layout:"Diseño y fondo",section_visibility:"Elementos visibles",section_forecast:"Pronóstico",section_stats:"Estadísticas propias (hasta 3 espacios)",section_actions:"Interacciones de la tarjeta",entity:"Entidad de clima (opcional)",entity_helper:"Provee condición, temperatura y pronóstico. Déjalo vacío para modo solo sensores.",temperature_entity:"Sensor de temperatura (reemplazo o principal)",temperature_entity_helper:"Reemplaza la temperatura del clima o define la principal en modo solo sensores.",temperature_attribute:"Atributo de temperatura (opcional)",condition_entity:"Sensor de condición (opcional)",condition_entity_helper:"Reemplaza la condición climática usando el estado de un sensor propio.",name:"Nombre personalizado (opcional)",orientation:"Orientación",orientation_horizontal:"Horizontal",orientation_vertical:"Vertical",background_mode:"Estilo de fondo",background_dynamic:"Pastel dinámico (clima y día/noche)",background_theme:"Tema de Home Assistant",background_transparent:"100% transparente",show_icon:"Mostrar ícono del clima",show_temperature:"Mostrar temperatura",show_condition:"Mostrar condición",show_name:"Mostrar nombre / ubicación",show_stats:"Mostrar estadísticas",show_forecast:"Mostrar pronóstico",forecast_type:"Tipo de pronóstico",forecast_daily:"Diario",forecast_hourly:"Por hora",forecast_items:"Máximo de elementos (opcional)",forecast_items_helper:"Déjalo vacío para adaptarlo automáticamente al tamaño de la tarjeta.",forecast_requires_weather:"Selecciona una entidad de clima arriba para habilitar el pronóstico.",stat_slot_1:"Estadística 1",stat_slot_2:"Estadística 2",stat_slot_3:"Estadística 3",stat_entity:"Entidad",stat_attribute:"Atributo (opcional)",stat_label:"Etiqueta corta (opcional)",stat_icon:"Ícono (opcional)",stat_unit:"Unidad personalizada (opcional)",stat_tap_action:"Acción al tocar",stat_double_tap_action:"Acción al doble toque",stat_hold_action:"Acción al mantener",tap_action:"Acción al tocar",double_tap_action:"Acción al doble toque",hold_action:"Acción al mantener"}},"zh-Hans":{card:{no_source:"请配置天气实体或自定义传感器",unavailable:"不可用",unknown:"未知",sensor_only_no_forecast:"天气预报需要配置 weather 实体",forecast_loading:"正在加载预报...",forecast_error:"预报不可用"},conditions:{sunny:"晴朗","clear-night":"晴夜",partlycloudy:"局部多云",cloudy:"多云",rainy:"有雨",pouring:"暴雨",lightning:"雷电","lightning-rainy":"雷阵雨",snowy:"下雪","snowy-rainy":"雨夹雪",hail:"冰雹",fog:"有雾",windy:"大风","windy-variant":"大风多云",exceptional:"特殊天气",unknown:"未知"},editor:{section_sources:"数据源",section_layout:"布局与背景",section_visibility:"可见元素",section_forecast:"天气预报",section_stats:"自定义统计（最多 3 项）",section_actions:"卡片交互",entity:"天气实体（可选）",entity_helper:"提供天气状况、温度和预报。留空则启用纯传感器模式。",temperature_entity:"温度传感器（覆盖或主温度）",temperature_entity_helper:"覆盖天气温度或在纯传感器模式下作为主温度。",temperature_attribute:"温度属性（可选）",condition_entity:"天气状况传感器（可选）",condition_entity_helper:"使用自定义传感器状态覆盖天气状况。",name:"自定义名称（可选）",orientation:"方向",orientation_horizontal:"水平",orientation_vertical:"垂直",background_mode:"背景样式",background_dynamic:"动态柔和粉彩（天气与昼夜）",background_theme:"Home Assistant 主题",background_transparent:"100% 透明",show_icon:"显示天气图标",show_temperature:"显示温度",show_condition:"显示天气状况",show_name:"显示名称/位置",show_stats:"显示自定义统计",show_forecast:"显示天气预报",forecast_type:"预报类型",forecast_daily:"每日",forecast_hourly:"每小时",forecast_items:"最大预报数量（可选）",forecast_items_helper:"留空将根据卡片尺寸自动适应。",forecast_requires_weather:"请在上方选择一个天气实体以启用预报显示。",stat_slot_1:"统计槽位 1",stat_slot_2:"统计槽位 2",stat_slot_3:"统计槽位 3",stat_entity:"实体",stat_attribute:"属性（可选）",stat_label:"简短标签（可选）",stat_icon:"图标（可选）",stat_unit:"自定义单位（可选）",stat_tap_action:"点击操作",stat_double_tap_action:"双击操作",stat_hold_action:"长按操作",tap_action:"点击操作",double_tap_action:"双击操作",hold_action:"长按操作"}},de:{card:{no_source:"Wetterentität oder eigene Sensoren konfigurieren",unavailable:"Nicht verfügbar",unknown:"Unbekannt",sensor_only_no_forecast:"Vorhersage erfordert eine Wetterentität",forecast_loading:"Vorhersage wird geladen...",forecast_error:"Vorhersage nicht verfügbar"},conditions:{sunny:"Sonnig","clear-night":"Klare Nacht",partlycloudy:"Teilweise bewölkt",cloudy:"Bewölkt",rainy:"Regnerisch",pouring:"Starkregen",lightning:"Gewitter","lightning-rainy":"Gewitter mit Regen",snowy:"Schneefall","snowy-rainy":"Schneeregen",hail:"Hagel",fog:"Nebel",windy:"Windig","windy-variant":"Windig & bewölkt",exceptional:"Außergewöhnlich",unknown:"Unbekannt"},editor:{section_sources:"Datenquellen",section_layout:"Layout & Hintergrund",section_visibility:"Sichtbare Elemente",section_forecast:"Vorhersage",section_stats:"Eigene Werte (bis zu 3 Slots)",section_actions:"Karten-Aktionen",entity:"Wetterentität (optional)",entity_helper:"Liefert Zustand, Temperatur und Vorhersage. Leer lassen für reinen Sensormodus.",temperature_entity:"Temperatursensor (Ersatz oder Hauptwert)",temperature_entity_helper:"Überschreibt die Wettertemperatur oder dient im Sensormodus als Haupttemperatur.",temperature_attribute:"Temperaturattribut (optional)",condition_entity:"Zustandssensor (optional)",condition_entity_helper:"Überschreibt den Wetterzustand über einen eigenen Sensor.",name:"Benutzerdefinierter Name (optional)",orientation:"Ausrichtung",orientation_horizontal:"Horizontal",orientation_vertical:"Vertikal",background_mode:"Hintergrundstil",background_dynamic:"Dynamisches Pastell (Wetter & Tag/Nacht)",background_theme:"Home Assistant Theme",background_transparent:"100 % transparent",show_icon:"Wettersymbol anzeigen",show_temperature:"Temperatur anzeigen",show_condition:"Wetterzustand anzeigen",show_name:"Name / Ort anzeigen",show_stats:"Eigene Werte anzeigen",show_forecast:"Vorhersage anzeigen",forecast_type:"Vorhersagetyp",forecast_daily:"Täglich",forecast_hourly:"Stündlich",forecast_items:"Max. Vorhersageeinträge (optional)",forecast_items_helper:"Leer lassen für automatische Anpassung an die Kartengröße.",forecast_requires_weather:"Wählen Sie oben eine Wetterentität aus, um die Vorhersage zu aktivieren.",stat_slot_1:"Wert-Slot 1",stat_slot_2:"Wert-Slot 2",stat_slot_3:"Wert-Slot 3",stat_entity:"Entität",stat_attribute:"Attribut (optional)",stat_label:"Kurzes Label (optional)",stat_icon:"Symbol (optional)",stat_unit:"Eigene Einheit (optional)",stat_tap_action:"Tipp-Aktion",stat_double_tap_action:"Doppeltipp-Aktion",stat_hold_action:"Halte-Aktion",tap_action:"Tipp-Aktion",double_tap_action:"Doppeltipp-Aktion",hold_action:"Halte-Aktion"}},it:{card:{no_source:"Configura un’entità meteo o sensori personalizzati",unavailable:"Non disponibile",unknown:"Sconosciuto",sensor_only_no_forecast:"Le previsioni richiedono un’entità meteo",forecast_loading:"Caricamento previsioni...",forecast_error:"Previsioni non disponibili"},conditions:{sunny:"Soleggiato","clear-night":"Notte serena",partlycloudy:"Parzialmente nuvoloso",cloudy:"Nuvoloso",rainy:"Piovoso",pouring:"Pioggia intensa",lightning:"Temporale","lightning-rainy":"Temporale e pioggia",snowy:"Nevoso","snowy-rainy":"Nevischio",hail:"Grandine",fog:"Nebbia",windy:"Ventoso","windy-variant":"Ventoso e nuvoloso",exceptional:"Eccezionale",unknown:"Sconosciuto"},editor:{section_sources:"Fonti dati",section_layout:"Layout e sfondo",section_visibility:"Elementi visibili",section_forecast:"Previsioni",section_stats:"Statistiche personalizzate (fino a 3 slot)",section_actions:"Interazioni scheda",entity:"Entità meteo (opzionale)",entity_helper:"Fornisce condizione, temperatura e previsioni. Lascia vuoto per la modalità solo sensori.",temperature_entity:"Sensore temperatura (sostitutivo o principale)",temperature_entity_helper:"Sostituisce la temperatura meteo o imposta quella principale in modalità solo sensori.",temperature_attribute:"Attributo temperatura (opzionale)",condition_entity:"Sensore condizione (opzionale)",condition_entity_helper:"Sostituisce la condizione meteo usando lo stato di un sensore.",name:"Nome personalizzato (opzionale)",orientation:"Orientamento",orientation_horizontal:"Orizzontale",orientation_vertical:"Verticale",background_mode:"Stile sfondo",background_dynamic:"Pastello dinamico (meteo e giorno/notte)",background_theme:"Tema Home Assistant",background_transparent:"100% trasparente",show_icon:"Mostra icona meteo",show_temperature:"Mostra temperatura",show_condition:"Mostra condizione",show_name:"Mostra nome / località",show_stats:"Mostra statistiche",show_forecast:"Mostra previsioni",forecast_type:"Tipo previsioni",forecast_daily:"Giornaliere",forecast_hourly:"Orarie",forecast_items:"Numero massimo previsioni (opzionale)",forecast_items_helper:"Lascia vuoto per adattare automaticamente alle dimensioni della scheda.",forecast_requires_weather:"Seleziona un’entità meteo sopra per abilitare le previsioni.",stat_slot_1:"Slot statistica 1",stat_slot_2:"Slot statistica 2",stat_slot_3:"Slot statistica 3",stat_entity:"Entità",stat_attribute:"Attributo (opzionale)",stat_label:"Etichetta breve (opzionale)",stat_icon:"Icona (opzionale)",stat_unit:"Unità personalizzata (opzionale)",stat_tap_action:"Azione al tocco",stat_double_tap_action:"Azione al doppio tocco",stat_hold_action:"Azione alla pressione prolungata",tap_action:"Azione al tocco",double_tap_action:"Azione al doppio tocco",hold_action:"Azione alla pressione prolungata"}},fr:{card:{no_source:"Configurez une entité météo ou des capteurs personnalisés",unavailable:"Indisponible",unknown:"Inconnu",sensor_only_no_forecast:"Les prévisions nécessitent une entité météo",forecast_loading:"Chargement des prévisions...",forecast_error:"Prévisions indisponibles"},conditions:{sunny:"Ensoleillé","clear-night":"Nuit claire",partlycloudy:"Partiellement nuageux",cloudy:"Nuageux",rainy:"Pluvieux",pouring:"Pluie battante",lightning:"Orage","lightning-rainy":"Orage et pluie",snowy:"Neigeux","snowy-rainy":"Neige fondue",hail:"Grêle",fog:"Brouillard",windy:"Venteux","windy-variant":"Venteux et nuageux",exceptional:"Exceptionnel",unknown:"Inconnu"},editor:{section_sources:"Sources de données",section_layout:"Disposition et arrière-plan",section_visibility:"Éléments visibles",section_forecast:"Prévisions",section_stats:"Statistiques personnalisées (jusqu’à 3)",section_actions:"Interactions de la carte",entity:"Entité météo (facultatif)",entity_helper:"Fournit la condition, la température et les prévisions. Laissez vide pour le mode capteurs uniquement.",temperature_entity:"Capteur de température (remplacement ou principal)",temperature_entity_helper:"Remplace la température météo ou définit la température principale en mode capteurs.",temperature_attribute:"Attribut de température (facultatif)",condition_entity:"Capteur de condition (facultatif)",condition_entity_helper:"Remplace la condition météo avec l’état d’un capteur personnalisé.",name:"Nom personnalisé (facultatif)",orientation:"Orientation",orientation_horizontal:"Horizontal",orientation_vertical:"Vertical",background_mode:"Style d’arrière-plan",background_dynamic:"Pastel dynamique (météo et jour/nuit)",background_theme:"Thème Home Assistant",background_transparent:"100 % transparent",show_icon:"Afficher l’icône météo",show_temperature:"Afficher la température",show_condition:"Afficher la condition",show_name:"Afficher le nom / lieu",show_stats:"Afficher les statistiques",show_forecast:"Afficher les prévisions",forecast_type:"Type de prévisions",forecast_daily:"Quotidiennes",forecast_hourly:"Horaires",forecast_items:"Nombre max. de prévisions (facultatif)",forecast_items_helper:"Laissez vide pour adapter automatiquement à la taille de la carte.",forecast_requires_weather:"Sélectionnez une entité météo ci-dessus pour activer les prévisions.",stat_slot_1:"Emplacement 1",stat_slot_2:"Emplacement 2",stat_slot_3:"Emplacement 3",stat_entity:"Entité",stat_attribute:"Attribut (facultatif)",stat_label:"Libellé court (facultatif)",stat_icon:"Icône (facultatif)",stat_unit:"Unité personnalisée (facultatif)",stat_tap_action:"Action au toucher",stat_double_tap_action:"Action au double toucher",stat_hold_action:"Action au maintien",tap_action:"Action au toucher",double_tap_action:"Action au double toucher",hold_action:"Action au maintien"}},pt:{card:{no_source:"Configure uma entidade de clima ou sensores próprios",unavailable:"Indisponível",unknown:"Desconhecido",sensor_only_no_forecast:"A previsão requer uma entidade weather",forecast_loading:"Carregando previsão...",forecast_error:"Previsão indisponível"},conditions:{sunny:"Ensolarado","clear-night":"Noite limpa",partlycloudy:"Parcialmente nublado",cloudy:"Nublado",rainy:"Chuvoso",pouring:"Chuva forte",lightning:"Trovoada","lightning-rainy":"Trovoada com chuva",snowy:"Nevando","snowy-rainy":"Chuva com neve",hail:"Granizo",fog:"Nevoeiro",windy:"Ventoso","windy-variant":"Vento e nuvens",exceptional:"Excepcional",unknown:"Desconhecido"},editor:{section_sources:"Fontes de dados",section_layout:"Layout e fundo",section_visibility:"Elementos visíveis",section_forecast:"Previsão",section_stats:"Estatísticas personalizadas (até 3 espaços)",section_actions:"Interações do cartão",entity:"Entidade de clima (opcional)",entity_helper:"Fornece condição, temperatura e previsão. Deixe vazio para o modo somente sensores.",temperature_entity:"Sensor de temperatura (substituição ou principal)",temperature_entity_helper:"Substitui a temperatura do clima ou define a principal no modo somente sensores.",temperature_attribute:"Atributo de temperatura (opcional)",condition_entity:"Sensor de condição (opcional)",condition_entity_helper:"Substitui a condição climática usando o estado de um sensor próprio.",name:"Nome personalizado (opcional)",orientation:"Orientação",orientation_horizontal:"Horizontal",orientation_vertical:"Vertical",background_mode:"Estilo de fundo",background_dynamic:"Pastel dinâmico (clima e dia/noite)",background_theme:"Tema do Home Assistant",background_transparent:"100% transparente",show_icon:"Mostrar ícone do clima",show_temperature:"Mostrar temperatura",show_condition:"Mostrar condição",show_name:"Mostrar nome / local",show_stats:"Mostrar estatísticas",show_forecast:"Mostrar previsão",forecast_type:"Tipo de previsão",forecast_daily:"Diária",forecast_hourly:"Por hora",forecast_items:"Máximo de itens da previsão (opcional)",forecast_items_helper:"Deixe vazio para adaptar automaticamente ao tamanho do cartão.",forecast_requires_weather:"Selecione uma entidade de clima acima para ativar a previsão.",stat_slot_1:"Espaço 1",stat_slot_2:"Espaço 2",stat_slot_3:"Espaço 3",stat_entity:"Entidade",stat_attribute:"Atributo (opcional)",stat_label:"Rótulo curto (opcional)",stat_icon:"Ícone (opcional)",stat_unit:"Unidade personalizada (opcional)",stat_tap_action:"Ação ao tocar",stat_double_tap_action:"Ação ao toque duplo",stat_hold_action:"Ação ao segurar",tap_action:"Ação ao tocar",double_tap_action:"Ação ao toque duplo",hold_action:"Ação ao segurar"}},ru:{card:{no_source:"Настройте объект погоды или собственные сенсоры",unavailable:"Недоступно",unknown:"Неизвестно",sensor_only_no_forecast:"Для прогноза требуется объект weather",forecast_loading:"Загрузка прогноза...",forecast_error:"Прогноз недоступен"},conditions:{sunny:"Солнечно","clear-night":"Ясная ночь",partlycloudy:"Переменная облачность",cloudy:"Облачно",rainy:"Дождь",pouring:"Ливень",lightning:"Гроза","lightning-rainy":"Гроза с дождём",snowy:"Снег","snowy-rainy":"Мокрый снег",hail:"Град",fog:"Туман",windy:"Ветрено","windy-variant":"Ветрено и облачно",exceptional:"Особые условия",unknown:"Неизвестно"},editor:{section_sources:"Источники данных",section_layout:"Макет и фон",section_visibility:"Видимые элементы",section_forecast:"Прогноз",section_stats:"Пользовательские показатели (до 3)",section_actions:"Действия карточки",entity:"Объект погоды (необязательно)",entity_helper:"Передаёт состояние, температуру и прогноз. Оставьте пустым для режима только с сенсорами.",temperature_entity:"Сенсор температуры (замена или основной)",temperature_entity_helper:"Заменяет температуру погоды или задаёт основную в режиме сенсоров.",temperature_attribute:"Атрибут температуры (необязательно)",condition_entity:"Сенсор погоды (необязательно)",condition_entity_helper:"Заменяет состояние погоды значением выбранного сенсора.",name:"Своё название (необязательно)",orientation:"Ориентация",orientation_horizontal:"Горизонтальная",orientation_vertical:"Вертикальная",background_mode:"Стиль фона",background_dynamic:"Динамический пастельный (погода и день/ночь)",background_theme:"Тема Home Assistant",background_transparent:"100% прозрачный",show_icon:"Показывать значок погоды",show_temperature:"Показывать температуру",show_condition:"Показывать описание погоды",show_name:"Показывать название / место",show_stats:"Показывать показатели",show_forecast:"Показывать прогноз",forecast_type:"Тип прогноза",forecast_daily:"По дням",forecast_hourly:"По часам",forecast_items:"Макс. элементов прогноза (необязательно)",forecast_items_helper:"Оставьте пустым для автоматической подстройки под размер карточки.",forecast_requires_weather:"Выберите объект погоды выше, чтобы включить прогноз.",stat_slot_1:"Показатель 1",stat_slot_2:"Показатель 2",stat_slot_3:"Показатель 3",stat_entity:"Объект",stat_attribute:"Атрибут (необязательно)",stat_label:"Короткая подпись (необязательно)",stat_icon:"Значок (необязательно)",stat_unit:"Своя единица (необязательно)",stat_tap_action:"Нажатие",stat_double_tap_action:"Двойное нажатие",stat_hold_action:"Удержание",tap_action:"Нажатие",double_tap_action:"Двойное нажатие",hold_action:"Удержание"}},pl:{card:{no_source:"Skonfiguruj encję pogody lub własne czujniki",unavailable:"Niedostępne",unknown:"Nieznane",sensor_only_no_forecast:"Prognoza wymaga encji weather",forecast_loading:"Ładowanie prognozy...",forecast_error:"Prognoza niedostępna"},conditions:{sunny:"Słonecznie","clear-night":"Bezchmurna noc",partlycloudy:"Częściowe zachmurzenie",cloudy:"Pochmurno",rainy:"Deszczowo",pouring:"Ulewa",lightning:"Burza","lightning-rainy":"Burza z deszczem",snowy:"Śnieg","snowy-rainy":"Deszcz ze śniegiem",hail:"Grad",fog:"Mgła",windy:"Wietrznie","windy-variant":"Wietrznie i pochmurno",exceptional:"Wyjątkowe warunki",unknown:"Nieznane"},editor:{section_sources:"Źródła danych",section_layout:"Układ i tło",section_visibility:"Widoczne elementy",section_forecast:"Prognoza",section_stats:"Własne statystyki (maks. 3 pola)",section_actions:"Interakcje karty",entity:"Encja pogody (opcjonalnie)",entity_helper:"Zapewnia stan, temperaturę i prognozę. Pozostaw puste dla trybu samych czujników.",temperature_entity:"Czujnik temperatury (nadpisanie lub główny)",temperature_entity_helper:"Nadpisuje temperaturę pogody lub ustawia główną w trybie czujników.",temperature_attribute:"Atrybut temperatury (opcjonalnie)",condition_entity:"Czujnik warunku (opcjonalnie)",condition_entity_helper:"Nadpisuje stan pogody na podstawie wybranego czujnika.",name:"Własna nazwa (opcjonalnie)",orientation:"Orientacja",orientation_horizontal:"Pozioma",orientation_vertical:"Pionowa",background_mode:"Styl tła",background_dynamic:"Dynamiczny pastel (pogoda i dzień/noc)",background_theme:"Motyw Home Assistant",background_transparent:"100% przezroczyste",show_icon:"Pokaż ikonę pogody",show_temperature:"Pokaż temperaturę",show_condition:"Pokaż stan pogody",show_name:"Pokaż nazwę / lokalizację",show_stats:"Pokaż statystyki",show_forecast:"Pokaż prognozę",forecast_type:"Typ prognozy",forecast_daily:"Dzienna",forecast_hourly:"Godzinowa",forecast_items:"Maks. liczba pozycji prognozy (opcjonalnie)",forecast_items_helper:"Pozostaw puste, aby automatycznie dopasować do rozmiaru karty.",forecast_requires_weather:"Wybierz encję pogody powyżej, aby włączyć prognozę.",stat_slot_1:"Pole 1",stat_slot_2:"Pole 2",stat_slot_3:"Pole 3",stat_entity:"Encja",stat_attribute:"Atrybut (opcjonalnie)",stat_label:"Krótka etykieta (opcjonalnie)",stat_icon:"Ikona (opcjonalnie)",stat_unit:"Własna jednostka (opcjonalnie)",stat_tap_action:"Akcja dotknięcia",stat_double_tap_action:"Akcja podwójnego dotknięcia",stat_hold_action:"Akcja przytrzymania",tap_action:"Akcja dotknięcia",double_tap_action:"Akcja podwójnego dotknięcia",hold_action:"Akcja przytrzymania"}},nl:{card:{no_source:"Configureer een weerentiteit of eigen sensoren",unavailable:"Niet beschikbaar",unknown:"Onbekend",sensor_only_no_forecast:"Voorspelling vereist een weather-entiteit",forecast_loading:"Voorspelling laden...",forecast_error:"Voorspelling niet beschikbaar"},conditions:{sunny:"Zonnig","clear-night":"Heldere nacht",partlycloudy:"Half bewolkt",cloudy:"Bewolkt",rainy:"Regenachtig",pouring:"Stortregen",lightning:"Onweer","lightning-rainy":"Onweer en regen",snowy:"Sneeuw","snowy-rainy":"Natte sneeuw",hail:"Hagel",fog:"Mist",windy:"Winderig","windy-variant":"Winderig en bewolkt",exceptional:"Uitzonderlijk",unknown:"Onbekend"},editor:{section_sources:"Gegevensbronnen",section_layout:"Indeling & achtergrond",section_visibility:"Zichtbare elementen",section_forecast:"Weersvoorspelling",section_stats:"Aangepaste statistieken (max. 3 vakken)",section_actions:"Kaartinteracties",entity:"Weerentiteit (optioneel)",entity_helper:"Levert conditie, temperatuur en voorspelling. Laat leeg voor alleen-sensorenmodus.",temperature_entity:"Temperatuursensor (vervanging of primair)",temperature_entity_helper:"Overschrijft de weertemperatuur of dient als hoofdtemperatuur in sensormodus.",temperature_attribute:"Temperatuurattribuut (optioneel)",condition_entity:"Conditiesensor (optioneel)",condition_entity_helper:"Overschrijft de weerconditie met de status van een eigen sensor.",name:"Aangepaste naam (optioneel)",orientation:"Oriëntatie",orientation_horizontal:"Horizontaal",orientation_vertical:"Verticaal",background_mode:"Achtergrondstijl",background_dynamic:"Dynamisch pastel (weer & dag/nacht)",background_theme:"Home Assistant-thema",background_transparent:"100% transparant",show_icon:"Weericoon tonen",show_temperature:"Temperatuur tonen",show_condition:"Conditie tonen",show_name:"Naam / locatie tonen",show_stats:"Statistieken tonen",show_forecast:"Voorspelling tonen",forecast_type:"Type voorspelling",forecast_daily:"Dagelijks",forecast_hourly:"Per uur",forecast_items:"Max. aantal items (optioneel)",forecast_items_helper:"Laat leeg om automatisch aan de kaartgrootte aan te passen.",forecast_requires_weather:"Selecteer hierboven een weerentiteit om de voorspelling te tonen.",stat_slot_1:"Vak 1",stat_slot_2:"Vak 2",stat_slot_3:"Vak 3",stat_entity:"Entiteit",stat_attribute:"Attribuut (optioneel)",stat_label:"Kort label (optioneel)",stat_icon:"Icoon (optioneel)",stat_unit:"Aangepaste eenheid (optioneel)",stat_tap_action:"Tik-actie",stat_double_tap_action:"Dubbeltik-actie",stat_hold_action:"Vasthoud-actie",tap_action:"Tik-actie",double_tap_action:"Dubbeltik-actie",hold_action:"Vasthoud-actie"}}},ft=["en","es","zh-Hans","de","it","fr","pt","ru","pl","nl"];function yt(t){if(!t)return"en";const e=t.trim().replace("_","-").toLowerCase();if("zh-hans"===e||"zh-cn"===e||"zh-sg"===e||"zh"===e)return"zh-Hans";const i=e.split("-")[0],o=ft.find(t=>t.toLowerCase()===e);if(o)return o;return ft.find(t=>t.toLowerCase()===i)??"en"}function bt(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function vt(t,e){const i=t.split("."),o=bt(gt[e],i);if(void 0!==o)return o;return bt(gt.en,i)??t}function wt(t,e,i){const o=function(t){if(!t||"string"!=typeof t)return null;const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());if(e){const t=Number(e[1]),i=Number(e[2]),o=Number(e[3]),a=new Date(t,i-1,o,12,0,0,0);return Number.isNaN(a.getTime())?null:a}const i=new Date(t);return Number.isNaN(i.getTime())?null:i}(t.datetime);if(!o)return"";const a=function(t){return"zh-Hans"===t?"zh-CN":t}(i);if("hourly"===e)return new Intl.DateTimeFormat(a,{hour:"2-digit",minute:"2-digit"}).format(o);return new Intl.DateTimeFormat(a,{weekday:"short"}).format(o).replace(/\.$/,"")}class xt{constructor(){this._generation=0,this._disposed=!1}async sync(t,e,i,o,a){if(!o||!e||!t?.connection)return await this.clear(),a.onData([]),void a.onLoading(!1);const n=`${e}::${i}`;if(this._activeKey===n&&this._unsubscribe)return;await this.clear(),this._disposed=!1,this._activeKey=n;const r=++this._generation;a.onLoading(!0);try{const o=await t.connection.subscribeMessage(t=>{this._disposed||r!==this._generation||(a.onLoading(!1),a.onData(Array.isArray(t?.forecast)?t.forecast:[]))},{type:"weather/subscribe_forecast",forecast_type:i,entity_id:e});if(this._disposed||r!==this._generation)return void await Promise.resolve(o());this._unsubscribe=o}catch{if(this._disposed||r!==this._generation)return;this._activeKey=void 0,a.onLoading(!1),a.onError()}}async clear(){this._generation+=1,this._activeKey=void 0;const t=this._unsubscribe;if(this._unsubscribe=void 0,t)try{await Promise.resolve(t())}catch{}}async destroy(){this._disposed=!0,await this.clear()}}const $t=["sunny","clear-night","partlycloudy","cloudy","rainy","pouring","lightning","lightning-rainy","snowy","snowy-rainy","hail","fog","windy","windy-variant","exceptional"];function At(t,e,i,o=!0){return V`
    <circle cx="${t}" cy="${e}" r="${i+5}" fill="#FFE8B6" fill-opacity="0.45" />
    ${o?[0,45,90,135,180,225,270,315].map(o=>{const a=o*Math.PI/180,n=i+3.5,r=i+7.5,s=(t+Math.cos(a)*n).toFixed(2),c=(e+Math.sin(a)*n).toFixed(2),l=(t+Math.cos(a)*r).toFixed(2),d=(e+Math.sin(a)*r).toFixed(2);return V`
              <line
                x1="${s}"
                y1="${c}"
                x2="${l}"
                y2="${d}"
                stroke="#FFD175"
                stroke-width="2.8"
                stroke-linecap="round"
              />
            `}):null}
    <circle cx="${t}" cy="${e}" r="${i}" fill="#FFD57E" />
    <circle cx="${t-.22*i}" cy="${e-.22*i}" r="${.48*i}" fill="#FFE9B0" fill-opacity="0.65" />
  `}function Et(t,e,i=1){return V`
    <g transform="translate(${t}, ${e}) scale(${i})">
      <circle cx="0" cy="0" r="16" fill="#DCD6FF" fill-opacity="0.22" />
      <path
        d="M5 -12.5A13 13 0 1 0 13.5 7.5A10.5 10.5 0 0 1 5 -12.5Z"
        fill="#D6CCFF"
      />
      <circle cx="-11" cy="-9" r="1.6" fill="#F2EEFF" />
      <circle cx="11" cy="-8" r="1.3" fill="#CFE1FF" />
    </g>
  `}function kt(t=0,e=0,i=1,o="#E5EFF8",a="#F6FAFF"){return V`
    <g transform="translate(${t}, ${e}) scale(${i})">
      <path
        d="M18 45h27a10.5 10.5 0 0 0 1.4-20.9A14.5 14.5 0 0 0 18.7 21A11.5 11.5 0 0 0 18 45Z"
        fill="${o}"
      />
      <path
        d="M21 29.5a11.5 11.5 0 0 1 20.6-3.2"
        fill="none"
        stroke="${a}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-opacity="0.7"
      />
    </g>
  `}function zt(t,e=!1){const i=e?"#7EB4E8":"#96C6F2",o=e?8:6.5;return V`
    ${(2===t?[24,38]:3===t?[21,31,41]:[18,27,36,45]).map((t,a)=>{const n=e&&a%2==1?47:49;return V`
        <line
          x1="${t}"
          y1="${n}"
          x2="${t-2.2}"
          y2="${n+o}"
          stroke="${i}"
          stroke-width="3"
          stroke-linecap="round"
        />
      `})}
  `}function Ct(t){return V`
    ${t.map(([t,e])=>V`
        <g transform="translate(${t}, ${e})">
          <circle cx="0" cy="0" r="2.7" fill="#BEE0FB" />
          <circle cx="0" cy="0" r="1.2" fill="#F2F8FF" />
        </g>
      `)}
  `}function Ft(t=0,e=!1){return V`
    <g transform="translate(0, ${t}) scale(${e?.85:1})">
      <path
        d="M12 26h28a5.5 5.5 0 1 0-5.2-7.3"
        fill="none"
        stroke="#9BD6DE"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <path
        d="M16 35h33a4.8 4.8 0 1 1-4.5 6.4"
        fill="none"
        stroke="#B5E3E8"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M12 44h18"
        fill="none"
        stroke="#C7EBEF"
        stroke-width="2.8"
        stroke-linecap="round"
      />
    </g>
  `}function St(t,e,i="weather-svg",o=""){return R`
    <svg
      class="${i}"
      viewBox="0 0 64 64"
      role="img"
      aria-label="${o}"
      aria-hidden="${o?"false":"true"}"
    >
      ${function(t,e){switch(t){case"sunny":return e?Et(32,32,1.15):At(32,32,13.5,!0);case"clear-night":return Et(32,32,1.2);case"partlycloudy":return V`
        ${e?Et(42,22,.82):At(43,22,9.5,!0)}
        ${kt(-2,4,.96,"#E4EEF8","#FFFFFF")}
      `;case"cloudy":return V`
        ${kt(9,-6,.78,"#C8D8EA","#E4EEF8")}
        ${kt(-2,3,.98,"#E4EEF8","#FFFFFF")}
      `;case"rainy":return V`
        ${kt(0,-3,.96,"#CFE0F2","#F0F6FC")}
        ${zt(3,!1)}
      `;case"pouring":return V`
        ${kt(0,-4,.96,"#BCCEE6","#E3ECF8")}
        ${zt(4,!0)}
      `;case"lightning":return V`
        ${kt(0,-4,.96,"#C4D1E6","#E8EFFA")}
        <path
          d="M34 39l-5.5 9.5h5.5l-3 9.5 9-12h-5.5l3.5-7z"
          fill="#FFE08A"
          stroke="#F7C761"
          stroke-width="1"
          stroke-linejoin="round"
        />
      `;case"lightning-rainy":return V`
        ${kt(0,-4,.96,"#BFCDE4","#E3ECF8")}
        <path
          d="M33 40l-4.8 8.2h4.6l-2.5 8.3 7.8-10.3h-4.7l2.9-6.2z"
          fill="#FFE08A"
        />
        ${zt(2,!1)}
      `;case"snowy":return V`
        ${kt(0,-4,.96,"#DCE9F6","#FFFFFF")}
        ${Ct([[22,50],[32,54],[42,50]])}
      `;case"snowy-rainy":return V`
        ${kt(0,-4,.96,"#D4E4F4","#F8FBFF")}
        ${zt(2,!1)}
        ${Ct([[31.5,53]])}
      `;case"hail":return V`
        ${kt(0,-4,.96,"#CFE0F2","#F4F9FF")}
        <polygon points="22,47 25,51 22,55 19,51" fill="#A9D2F5" />
        <polygon points="32,50 35,54 32,58 29,54" fill="#CBE4FA" />
        <polygon points="42,47 45,51 42,55 39,51" fill="#A9D2F5" />
      `;case"fog":return V`
        ${kt(2,-7,.88,"#DCE7F3","#F5F9FE")}
        <line x1="14" y1="43" x2="50" y2="43" stroke="#C0D2E5" stroke-width="3.2" stroke-linecap="round" />
        <line x1="18" y1="50" x2="46" y2="50" stroke="#CEDCEB" stroke-width="3" stroke-linecap="round" />
        <line x1="22" y1="56.5" x2="42" y2="56.5" stroke="#DCE6F2" stroke-width="2.6" stroke-linecap="round" />
      `;case"windy":return Ft(0,!1);case"windy-variant":return V`
        ${kt(2,-9,.8,"#DDE9F5","#FFFFFF")}
        ${Ft(13,!0)}
      `;case"exceptional":return V`
        <circle cx="32" cy="32" r="19" fill="#FFB5A7" fill-opacity="0.32" />
        <circle cx="32" cy="32" r="14" fill="#FFA696" />
        <line x1="32" y1="24" x2="32" y2="34" stroke="#FFF9F7" stroke-width="3.2" stroke-linecap="round" />
        <circle cx="32" cy="40" r="1.9" fill="#FFF9F7" />
      `;case"thermometer":return V`
        <rect x="27" y="13" width="10" height="29" rx="5" fill="#DCE8F5" />
        <circle cx="32" cy="45" r="9.5" fill="#DCE8F5" />
        <rect x="30" y="24" width="4" height="19" rx="2" fill="#FFA89E" />
        <circle cx="32" cy="45" r="5.8" fill="#FFA89E" />
        <circle cx="30" cy="43" r="1.8" fill="#FFD5CE" />
      `;default:return V`
        ${kt(0,0,.94,"#D6E2EE","#F0F6FC")}
        <circle cx="32" cy="35" r="2.2" fill="#8EA7C2" />
      `}}(t,e)}
    </svg>
  `}const Pt="#1E293B",Bt="#475569",Dt="#F4F6FB",Tt="#C4CEE3";const Mt={orientation:"horizontal",background_mode:"dynamic",show_icon:!0,show_temperature:!0,show_condition:!0,show_name:!0,show_stats:!0,show_forecast:!1,forecast_type:"daily"};function Nt(t){return"string"==typeof t&&$t.includes(t)}function jt(t){return(Array.isArray(t.stats)?t.stats:[t.stat_1,t.stat_2,t.stat_3]).filter(t=>Boolean(t&&"string"==typeof t.entity&&""!==t.entity.trim())).slice(0,3)}function Ht(t){if(null==t)return!0;if("string"==typeof t){const e=t.trim().toLowerCase();return""===e||"unavailable"===e||"unknown"===e}return!1}function Ot(t){if("number"==typeof t)return Number.isFinite(t)?Number.isInteger(t)?String(t):t.toFixed(1):"";if("string"==typeof t){const e=t.trim(),i=Number(e);return""!==e&&Number.isFinite(i)?Number.isInteger(i)?String(i):i.toFixed(1):e}return String(t??"")}function Lt(t){const e=String(t?.attributes?.device_class??"").toLowerCase(),i=String(t?.attributes?.unit_of_measurement??"").toLowerCase();return"humidity"===e||"%"===i?"mdi:water-percent":"temperature"===e||i.includes("°")?"mdi:thermometer":"wind_speed"===e||i.includes("km/h")||i.includes("m/s")||i.includes("mph")?"mdi:weather-windy":"pressure"===e||"hpa"===i||"mbar"===i?"mdi:gauge":"precipitation"===e||"precipitation_intensity"===e||"mm"===i?"mdi:weather-rainy":"irradiance"===e||t?.entity_id.includes("uv")?"mdi:weather-sunny":"aqi"===e||"pm25"===e||"pm10"===e?"mdi:air-filter":"mdi:chart-box-outline"}function It(t,e){return{entity:e,tap_action:t.tap_action??{action:"more-info"},double_tap_action:t.double_tap_action??{action:"none"},hold_action:t.hold_action??{action:"none"}}}function Ut(t){const e=t.entity||t.temperature_entity||jt(t)[0]?.entity;return{entity:e,tap_action:t.tap_action??(e?{action:"more-info"}:{action:"none"}),double_tap_action:t.double_tap_action??{action:"none"},hold_action:t.hold_action??{action:"none"}}}function Wt(t,e,i=new Date){const o=jt(e),a=e.entity?.trim()||void 0,n=e.temperature_entity?.trim()||void 0,r=e.condition_entity?.trim()||void 0,s=Boolean(a||n||r||o.length>0),c=a?t?.states?.[a]:void 0,l=n?t?.states?.[n]:void 0,d=r?t?.states?.[r]:void 0;let p;d&&!Ht(d.state)?p=d.state:c&&!Ht(c.state)&&(p=c.state);const h=p?.trim().toLowerCase(),u=Boolean(p),_=Nt(h)?h:"unknown";let m=null,g=t?.config?.unit_system?.temperature??"°C";if(n){if(l){const t=e.temperature_attribute?.trim(),i=t?l.attributes?.[t]:l.state;Ht(i)||(m=Ot(i)),"string"!=typeof l.attributes?.unit_of_measurement||t||(g=l.attributes.unit_of_measurement)}}else if(c){const t=c.attributes?.temperature;Ht(t)||(m=Ot(t)),"string"==typeof c.attributes?.temperature_unit&&(g=c.attributes.temperature_unit)}const f=e.name?.trim()||("string"==typeof c?.attributes?.friendly_name?c.attributes.friendly_name:"")||("string"==typeof l?.attributes?.friendly_name?l.attributes.friendly_name:"")||"",y=function(t,e,i=new Date){if("clear-night"===e)return!0;const o=t?.states?.["sun.sun"]?.state;if("below_horizon"===o)return!0;if("above_horizon"===o)return!1;const a=i.getHours();return a<6||a>=20}(t,_,i),b=o.map((e,i)=>{const o=e.entity.trim(),a=t?.states?.[o],n=e.attribute?.trim();if(!a)return{index:i,entityId:o,value:"—",label:e.label?.trim()||void 0,icon:e.icon?.trim()||"mdi:chart-box-outline",unavailable:!0,actionConfig:It(e,o)};const r=n?a.attributes?.[n]:a.state,s=Ht(r),c=s?"—":Ot(r),l=e.unit?.trim(),d=n||"string"!=typeof a.attributes?.unit_of_measurement?void 0:a.attributes.unit_of_measurement;return{index:i,entityId:o,value:c,unit:s?void 0:l??d,label:e.label?.trim()||void 0,icon:e.icon?.trim()||Lt(a),unavailable:s,actionConfig:It(e,o)}}),v=Boolean(a&&!c)||Boolean(n&&!l)||Boolean(c)&&Ht(c?.state)&&null===m&&!d;return{hasSource:s,hasWeatherEntity:Boolean(a),condition:_,rawCondition:p,hasExplicitCondition:u,conditionLabelKey:_,temperature:m,temperatureUnit:g,name:f,isNight:y,stats:b,unavailable:v}}function Rt(t,e,i){const o=function(t,e,i){if("transparent"===i)return{bg:"transparent",text:"var(--primary-text-color, #1E293B)",muted:"var(--secondary-text-color, #475569)",chipBg:"rgba(127, 138, 156, 0.12)",chipBorder:"rgba(127, 138, 156, 0.18)",forecastBg:"rgba(127, 138, 156, 0.08)",border:"none",shadow:"none",accent:"var(--primary-color, #7DA8D8)",divider:"rgba(127, 138, 156, 0.2)"};if("theme"===i)return{bg:"var(--ha-card-background, var(--card-background-color, #FFFFFF))",text:"var(--primary-text-color, #1E293B)",muted:"var(--secondary-text-color, #64748B)",chipBg:"var(--secondary-background-color, rgba(127, 138, 156, 0.09))",chipBorder:"var(--ha-card-border-color, rgba(127, 138, 156, 0.16))",forecastBg:"var(--secondary-background-color, rgba(127, 138, 156, 0.06))",border:"var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.08)))",shadow:"var(--ha-card-box-shadow, none)",accent:"var(--primary-color, #7DA8D8)",divider:"var(--divider-color, rgba(127, 138, 156, 0.16))"};if(e)switch(t){case"sunny":case"clear-night":return{bg:"linear-gradient(140deg, #272D45 0%, #3A4266 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.14)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#D6CCFF",divider:"rgba(255, 255, 255, 0.13)"};case"partlycloudy":return{bg:"linear-gradient(140deg, #2E374D 0%, #404D69 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.14)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#C3D7FA",divider:"rgba(255, 255, 255, 0.13)"};case"rainy":case"pouring":return{bg:"linear-gradient(140deg, #25344A 0%, #344A68 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.15)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#9BC8F2",divider:"rgba(255, 255, 255, 0.13)"};case"lightning":case"lightning-rainy":return{bg:"linear-gradient(140deg, #302B48 0%, #453D66 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.15)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#FFE08A",divider:"rgba(255, 255, 255, 0.13)"};case"snowy":case"snowy-rainy":case"hail":return{bg:"linear-gradient(140deg, #2B3B4E 0%, #3B516A 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.11)",chipBorder:"rgba(255, 255, 255, 0.15)",forecastBg:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.13)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#CBE5FA",divider:"rgba(255, 255, 255, 0.13)"};case"windy":case"windy-variant":return{bg:"linear-gradient(140deg, #263B40 0%, #355259 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.14)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#A9DFE5",divider:"rgba(255, 255, 255, 0.13)"};case"exceptional":return{bg:"linear-gradient(140deg, #432D39 0%, #593C4C 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.14)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#FFB5A7",divider:"rgba(255, 255, 255, 0.13)"};default:return{bg:"linear-gradient(140deg, #303748 0%, #414A5F 100%)",text:Dt,muted:Tt,chipBg:"rgba(255, 255, 255, 0.10)",chipBorder:"rgba(255, 255, 255, 0.14)",forecastBg:"rgba(255, 255, 255, 0.07)",border:"1px solid rgba(255, 255, 255, 0.12)",shadow:"0 8px 24px rgba(15, 23, 42, 0.18)",accent:"#CAD7EA",divider:"rgba(255, 255, 255, 0.13)"}}switch(t){case"sunny":return{bg:"linear-gradient(140deg, #FFF6E6 0%, #FFE7C7 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.58)",chipBorder:"rgba(217, 155, 78, 0.18)",forecastBg:"rgba(255, 255, 255, 0.45)",border:"1px solid rgba(217, 155, 78, 0.18)",shadow:"0 8px 24px rgba(190, 145, 90, 0.10)",accent:"#E39A40",divider:"rgba(148, 108, 56, 0.14)"};case"partlycloudy":return{bg:"linear-gradient(140deg, #F4F9FF 0%, #E1EEFA 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.65)",chipBorder:"rgba(100, 145, 195, 0.16)",forecastBg:"rgba(255, 255, 255, 0.50)",border:"1px solid rgba(100, 145, 195, 0.16)",shadow:"0 8px 24px rgba(100, 140, 185, 0.10)",accent:"#639CD9",divider:"rgba(71, 85, 105, 0.12)"};case"rainy":case"pouring":return{bg:"linear-gradient(140deg, #EAF3FC 0%, #D4E6F7 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.62)",chipBorder:"rgba(90, 138, 190, 0.18)",forecastBg:"rgba(255, 255, 255, 0.46)",border:"1px solid rgba(90, 138, 190, 0.18)",shadow:"0 8px 24px rgba(80, 125, 175, 0.10)",accent:"#5992CC",divider:"rgba(71, 85, 105, 0.13)"};case"lightning":case"lightning-rainy":return{bg:"linear-gradient(140deg, #F0ECF9 0%, #DFD7F3 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.62)",chipBorder:"rgba(128, 109, 178, 0.18)",forecastBg:"rgba(255, 255, 255, 0.46)",border:"1px solid rgba(128, 109, 178, 0.18)",shadow:"0 8px 24px rgba(115, 96, 165, 0.10)",accent:"#7D69B2",divider:"rgba(71, 85, 105, 0.13)"};case"snowy":case"snowy-rainy":case"hail":return{bg:"linear-gradient(140deg, #F2F9FD 0%, #DFEFF9 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.68)",chipBorder:"rgba(110, 162, 204, 0.18)",forecastBg:"rgba(255, 255, 255, 0.52)",border:"1px solid rgba(110, 162, 204, 0.18)",shadow:"0 8px 24px rgba(105, 155, 195, 0.10)",accent:"#6BA7D6",divider:"rgba(71, 85, 105, 0.12)"};case"windy":case"windy-variant":return{bg:"linear-gradient(140deg, #EBF8F6 0%, #D5EEEA 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.64)",chipBorder:"rgba(84, 156, 150, 0.18)",forecastBg:"rgba(255, 255, 255, 0.48)",border:"1px solid rgba(84, 156, 150, 0.18)",shadow:"0 8px 24px rgba(84, 156, 150, 0.10)",accent:"#4F9E98",divider:"rgba(71, 85, 105, 0.12)"};case"exceptional":return{bg:"linear-gradient(140deg, #FFF0ED 0%, #FFE0D9 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.64)",chipBorder:"rgba(209, 107, 94, 0.20)",forecastBg:"rgba(255, 255, 255, 0.48)",border:"1px solid rgba(209, 107, 94, 0.20)",shadow:"0 8px 24px rgba(190, 100, 90, 0.10)",accent:"#D47264",divider:"rgba(71, 85, 105, 0.12)"};default:return{bg:"linear-gradient(140deg, #F2F5F9 0%, #E3EBF3 100%)",text:Pt,muted:Bt,chipBg:"rgba(255, 255, 255, 0.65)",chipBorder:"rgba(118, 136, 160, 0.16)",forecastBg:"rgba(255, 255, 255, 0.50)",border:"1px solid rgba(118, 136, 160, 0.16)",shadow:"0 8px 24px rgba(100, 120, 145, 0.08)",accent:"#6F88A6",divider:"rgba(71, 85, 105, 0.12)"}}}(t,e,i??Mt.background_mode??"dynamic");return[`--spwc-bg: ${o.bg}`,`--spwc-text: ${o.text}`,`--spwc-muted: ${o.muted}`,`--spwc-chip-bg: ${o.chipBg}`,`--spwc-chip-border: ${o.chipBorder}`,`--spwc-forecast-bg: ${o.forecastBg}`,`--spwc-border: ${o.border}`,`--spwc-shadow: ${o.shadow}`,`--spwc-accent: ${o.accent}`,`--spwc-divider: ${o.divider}`].join("; ")}function Vt(t){return Boolean(t&&t.action&&"none"!==t.action)}function qt(t){return Vt(t.tap_action)||Vt(t.double_tap_action)||Vt(t.hold_action)}function Kt(t,e,i){Vt("tap"===i?e.tap_action:"double_tap"===i?e.double_tap_action:e.hold_action)&&t.dispatchEvent(new CustomEvent("hass-action",{detail:{config:e,action:i},bubbles:!0,composed:!0}))}class Gt{constructor(){this._states=new Map}_getOrCreateState(t){let e=this._states.get(t);return e||(e={startX:0,startY:0,held:!1,moved:!1,active:!1},this._states.set(t,e)),e}_clearHoldTimer(t){void 0!==t.holdTimer&&(window.clearTimeout(t.holdTimer),t.holdTimer=void 0)}_clearTapTimer(t){void 0!==t.tapTimer&&(window.clearTimeout(t.tapTimer),t.tapTimer=void 0)}handlePointerDown(t,e,i,o){if("mouse"===t.pointerType&&0!==t.button)return;const a=this._getOrCreateState(e);this._clearHoldTimer(a),a.pointerId=t.pointerId,a.startX=t.clientX,a.startY=t.clientY,a.held=!1,a.moved=!1,a.active=!0,a.lastPointerType=t.pointerType,Vt(i.hold_action)&&(a.holdTimer=window.setTimeout(()=>{a.holdTimer=void 0,a.active&&!a.moved&&(a.held=!0,o("hold"))},500))}handlePointerMove(t,e){const i=this._states.get(e);if(!i||!i.active||i.moved)return;if(void 0!==i.pointerId&&t.pointerId!==i.pointerId)return;Math.hypot(t.clientX-i.startX,t.clientY-i.startY)>10&&(i.moved=!0,this._clearHoldTimer(i))}handlePointerUp(t,e,i,o){const a=this._states.get(e);if(a&&a.active&&(void 0===a.pointerId||t.pointerId===a.pointerId)){if(this._clearHoldTimer(a),a.active=!1,a.held||a.moved)return this._clearTapTimer(a),void(a.moved=!1);Vt(i.double_tap_action)?void 0!==a.tapTimer?(this._clearTapTimer(a),o("double_tap")):a.tapTimer=window.setTimeout(()=>{a.tapTimer=void 0,Vt(i.tap_action)&&o("tap")},250):(this._clearTapTimer(a),Vt(i.tap_action)&&o("tap"))}}handlePointerCancel(t){const e=this._states.get(t);e&&(this._clearHoldTimer(e),this._clearTapTimer(e),e.active=!1,e.held=!1,e.moved=!1)}handleContextMenu(t,e,i){if(!Vt(i.hold_action))return;const o=this._states.get(e);(o?.held||"touch"===o?.lastPointerType||"pen"===o?.lastPointerType)&&t.preventDefault()}destroy(){for(const t of this._states.values())this._clearHoldTimer(t),this._clearTapTimer(t);this._states.clear()}}let Zt=class extends lt{constructor(){super(...arguments),this._config={type:"custom:simple-pastel-weather-card",...Mt},this._helpersLoaded=!1,this._computeLabel=t=>{switch(t.name){case"entity":return this._t("editor.entity");case"temperature_entity":return this._t("editor.temperature_entity");case"temperature_attribute":return this._t("editor.temperature_attribute");case"condition_entity":return this._t("editor.condition_entity");case"name":return this._t("editor.name");case"orientation":return this._t("editor.orientation");case"background_mode":return this._t("editor.background_mode");case"show_icon":return this._t("editor.show_icon");case"show_temperature":return this._t("editor.show_temperature");case"show_condition":return this._t("editor.show_condition");case"show_name":return this._t("editor.show_name");case"show_stats":return this._t("editor.show_stats");case"show_forecast":return this._t("editor.show_forecast");case"forecast_type":return this._t("editor.forecast_type");case"forecast_items":return this._t("editor.forecast_items");case"attribute":return this._t("editor.stat_attribute");case"label":return this._t("editor.stat_label");case"icon":return this._t("editor.stat_icon");case"unit":return this._t("editor.stat_unit");case"tap_action":return this._t("editor.tap_action");case"double_tap_action":return this._t("editor.double_tap_action");case"hold_action":return this._t("editor.hold_action");default:return t.name??""}},this._computeHelper=t=>{switch(t.name){case"entity":return this._t("editor.entity_helper");case"temperature_entity":return this._t("editor.temperature_entity_helper");case"condition_entity":return this._t("editor.condition_entity_helper");case"forecast_items":return this._t("editor.forecast_items_helper");default:return}}}setConfig(t){this._config={...Mt,...t}}connectedCallback(){super.connectedCallback(),this._ensureHaComponents()}async _ensureHaComponents(){if(customElements.get("ha-form"))this._helpersLoaded=!0;else try{const t=window,e=await(t.loadCardHelpers?.());if(e){const t=await e.createCardElement({type:"entities",entities:[]});await(t?.constructor?.getConfigElement?.())}}catch{}finally{this._helpersLoaded=!0,this.requestUpdate()}}get _lang(){return yt(this.hass?.locale?.language||this.hass?.language)}_t(t){return vt(t,this._lang)}_buildFormData(){const t=jt(this._config);return{...Mt,...this._config,stat_1:t[0]?{...t[0]}:{},stat_2:t[1]?{...t[1]}:{},stat_3:t[2]?{...t[2]}:{}}}_cleanStatSlot(t,e){if(!t||"object"!=typeof t)return;const i=t,o="string"==typeof i.entity?i.entity.trim():"";if(!o)return;const a={entity:o},n=e?.entity?.trim();return("string"==typeof i.attribute&&""!==i.attribute.trim()&&n===o||"string"==typeof i.attribute&&""!==i.attribute.trim()&&void 0===n)&&(a.attribute=i.attribute.trim()),"string"==typeof i.label&&""!==i.label.trim()&&(a.label=i.label.trim()),"string"==typeof i.icon&&""!==i.icon.trim()&&(a.icon=i.icon.trim()),"string"==typeof i.unit&&""!==i.unit.trim()&&(a.unit=i.unit.trim()),i.tap_action&&"object"==typeof i.tap_action&&(a.tap_action=i.tap_action),i.double_tap_action&&"object"==typeof i.double_tap_action&&(a.double_tap_action=i.double_tap_action),i.hold_action&&"object"==typeof i.hold_action&&(a.hold_action=i.hold_action),a}_buildStatSlotSchema(t,e,i){const o=[{name:"entity",selector:{entity:{}}}];return Boolean(i?.entity&&""!==i.entity.trim())&&i?.entity&&o.push({name:"attribute",selector:{attribute:{entity_id:i.entity}}}),o.push({type:"grid",schema:[{name:"label",selector:{text:{}}},{name:"unit",selector:{text:{}}}]},{name:"icon",selector:{icon:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}}),{type:"expandable",name:t,title:this._t(e),schema:o}}_buildSchema(t){const e="string"==typeof t.temperature_entity?t.temperature_entity.trim():"",i=[{name:"entity",selector:{entity:{domain:"weather"}}},{name:"temperature_entity",selector:{entity:{domain:["sensor","input_number","number"]}}}];e&&i.push({name:"temperature_attribute",selector:{attribute:{entity_id:e}}}),i.push({name:"condition_entity",selector:{entity:{domain:["sensor","weather","input_text"]}}},{name:"name",selector:{text:{}}});const o=[{name:"orientation",selector:{select:{mode:"dropdown",options:[{value:"horizontal",label:this._t("editor.orientation_horizontal")},{value:"vertical",label:this._t("editor.orientation_vertical")}]}}},{name:"background_mode",selector:{select:{mode:"dropdown",options:[{value:"dynamic",label:this._t("editor.background_dynamic")},{value:"theme",label:this._t("editor.background_theme")},{value:"transparent",label:this._t("editor.background_transparent")}]}}}],a=[{name:"forecast_type",selector:{select:{mode:"dropdown",options:[{value:"daily",label:this._t("editor.forecast_daily")},{value:"hourly",label:this._t("editor.forecast_hourly")}]}}},{name:"forecast_items",selector:{number:{min:1,max:14,mode:"box"}}}],n=t.stat_1,r=t.stat_2,s=t.stat_3;return[{type:"expandable",flatten:!0,expanded:!0,title:this._t("editor.section_sources"),schema:i},{type:"expandable",flatten:!0,expanded:!0,title:this._t("editor.section_layout"),schema:o},{type:"expandable",flatten:!0,title:this._t("editor.section_visibility"),schema:[{type:"grid",schema:[{name:"show_icon",selector:{boolean:{}}},{name:"show_temperature",selector:{boolean:{}}},{name:"show_condition",selector:{boolean:{}}},{name:"show_name",selector:{boolean:{}}},{name:"show_stats",selector:{boolean:{}}},{name:"show_forecast",selector:{boolean:{}}}]}]},{type:"expandable",flatten:!0,title:this._t("editor.section_forecast"),schema:a},{type:"expandable",flatten:!0,title:this._t("editor.section_stats"),schema:[this._buildStatSlotSchema("stat_1","editor.stat_slot_1",n),this._buildStatSlotSchema("stat_2","editor.stat_slot_2",r),this._buildStatSlotSchema("stat_3","editor.stat_slot_3",s)]},{type:"expandable",flatten:!0,title:this._t("editor.section_actions"),schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}}]}]}_handleValueChanged(t){t.stopPropagation();const e=t.detail?.value;if(!e||"object"!=typeof e)return;const i=jt(this._config),o=this._config.temperature_entity?.trim()||"",a={type:this._config.type||"custom:simple-pastel-weather-card"},n=["entity","temperature_entity","temperature_attribute","condition_entity","name","orientation","background_mode","forecast_type"];for(const t of n){const i=e[t];"string"==typeof i&&""!==i.trim()&&(a[t]=i.trim())}const r=a.temperature_entity||"";(!r||o&&o!==r)&&delete a.temperature_attribute;const s=["show_icon","show_temperature","show_condition","show_name","show_stats","show_forecast"];for(const t of s)"boolean"==typeof e[t]&&(a[t]=e[t]);"number"==typeof e.forecast_items&&Number.isFinite(e.forecast_items)&&e.forecast_items>0&&(a.forecast_items=Math.floor(e.forecast_items));const c=[this._cleanStatSlot(e.stat_1,i[0]),this._cleanStatSlot(e.stat_2,i[1]),this._cleanStatSlot(e.stat_3,i[2])].filter(t=>Boolean(t));c.length>0&&(a.stats=c);const l=["tap_action","double_tap_action","hold_action"];for(const t of l){const i=e[t];i&&"object"==typeof i&&(a[t]=i)}this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}render(){const t=this._buildFormData(),e=this._buildSchema(t),i=Boolean(this._config.show_forecast)&&!this._config.entity?.trim();return R`
      <div class="editor-root">
        ${i?R`<div class="editor-notice">${this._t("editor.forecast_requires_weather")}</div>`:K}
        ${this._helpersLoaded?R`
              <ha-form
                .hass=${this.hass}
                .data=${t}
                .schema=${e}
                .computeLabel=${this._computeLabel}
                .computeHelper=${this._computeHelper}
                @value-changed=${this._handleValueChanged}
              ></ha-form>
            `:K}
      </div>
    `}};Zt.styles=r`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .editor-notice {
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--warning-color, rgba(245, 158, 11, 0.14));
      color: var(--primary-text-color);
      font-size: 0.875rem;
      line-height: 1.35;
    }
  `,t([_t({attribute:!1})],Zt.prototype,"hass",void 0),t([mt()],Zt.prototype,"_config",void 0),t([mt()],Zt.prototype,"_helpersLoaded",void 0),Zt=t([pt("simple-pastel-weather-card-editor")],Zt);let Yt=class extends lt{constructor(){super(...arguments),this._config={type:"custom:simple-pastel-weather-card",...Mt},this._forecast=[],this._forecastLoading=!1,this._forecastError=!1,this._containerWidth=480,this._containerHeight=120,this._canScrollPrev=!1,this._canScrollNext=!1,this._forecastManager=new xt,this._gestureController=new Gt,this._handleCardAction=t=>{Kt(this,Ut(this._config),t)},this._onCardPointerDown=t=>{if(this._isEventFromInteractiveChild(t))return;const e=Ut(this._config);qt(e)&&this._gestureController.handlePointerDown(t,"card",e,this._handleCardAction)},this._onCardPointerMove=t=>{this._isEventFromInteractiveChild(t)||this._gestureController.handlePointerMove(t,"card")},this._onCardPointerUp=t=>{if(this._isEventFromInteractiveChild(t))return;const e=Ut(this._config);qt(e)&&this._gestureController.handlePointerUp(t,"card",e,this._handleCardAction)},this._onCardPointerCancel=()=>{this._gestureController.handlePointerCancel("card")},this._onCardContextMenu=t=>{if(this._isEventFromInteractiveChild(t))return;const e=Ut(this._config);this._gestureController.handleContextMenu(t,"card",e)},this._onCardKeyDown=t=>{if(this._isEventFromInteractiveChild(t))return;if("Enter"!==t.key&&" "!==t.key)return;qt(Ut(this._config))&&(t.preventDefault(),this._handleCardAction("tap"))},this._updateScrollButtons=()=>{const t=this.shadowRoot?.querySelector(".forecast-scroller");if(!t)return this._canScrollPrev=!1,void(this._canScrollNext=!1);const e=Math.max(0,t.scrollWidth-t.clientWidth);this._canScrollPrev=t.scrollLeft>2,this._canScrollNext=t.scrollLeft<e-2},this._stopInteractionPropagation=t=>{t.stopPropagation()}}static getConfigElement(){return document.createElement("simple-pastel-weather-card-editor")}static getStubConfig(t){const e=t?.states?Object.keys(t.states).find(t=>t.startsWith("weather.")):void 0;return{type:"custom:simple-pastel-weather-card",...e?{entity:e}:{},...Mt}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...Mt,...t}}getGridOptions(){return function(t){const e=t.orientation??Mt.orientation??"horizontal",i=Boolean(t.show_forecast);return"vertical"===e?i?{columns:6,min_columns:6,max_columns:12,rows:4,min_rows:4}:{columns:3,min_columns:3,max_columns:12,rows:2,min_rows:2}:i?{columns:12,min_columns:12,max_columns:12,rows:2,min_rows:2}:{columns:6,min_columns:6,max_columns:12,rows:1,min_rows:1}}(this._config)}getCardSize(){const t=this._config.orientation??"horizontal",e=Boolean(this._config.show_forecast);return"vertical"===t?e?4:2:e?2:1}connectedCallback(){super.connectedCallback(),this._setupResizeObserver(),this._syncForecastSubscription()}disconnectedCallback(){super.disconnectedCallback(),this._teardownResizeObserver(),this._gestureController.destroy(),this._forecastManager.destroy()}firstUpdated(){this._setupResizeObserver()}updated(t){super.updated(t),(t.has("_config")||t.has("hass"))&&this._syncForecastSubscription(),(t.has("_forecast")||t.has("_containerWidth")||t.has("_containerHeight")||t.has("_config"))&&requestAnimationFrame(()=>this._updateScrollButtons())}_setupResizeObserver(){const t=this.shadowRoot?.querySelector("ha-card");t&&"undefined"!=typeof ResizeObserver&&(this._observedElement===t&&this._resizeObserver||(this._teardownResizeObserver(),this._observedElement=t,this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const t=Math.round(e.contentRect.width),i=Math.round(e.contentRect.height);t>0&&t!==this._containerWidth&&(this._containerWidth=t),i>0&&i!==this._containerHeight&&(this._containerHeight=i)}}),this._resizeObserver.observe(t)))}_teardownResizeObserver(){this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._observedElement=void 0}async _syncForecastSubscription(){const t=Boolean(this._config.show_forecast&&this._config.entity?.trim()),e=this._config.forecast_type??"daily",i=this._config.entity?.trim();await this._forecastManager.sync(this.hass,i,e,t,{onData:t=>{this._forecastError=!1,this._forecast=t},onError:()=>{this._forecastError=!0,this._forecast=[]},onLoading:t=>{this._forecastLoading=t}})}get _lang(){return yt(this.hass?.locale?.language||this.hass?.language)}_t(t){return vt(t,this._lang)}_isEventFromInteractiveChild(t){const e=t.composedPath?.()??[];for(const t of e)if(t instanceof Element&&(t.classList?.contains("stat-item")&&t.classList?.contains("interactive")||t.classList?.contains("forecast-nav-btn")||t.classList?.contains("forecast-scroller")))return!0;const i=t.target;return Boolean(i?.closest?.(".stat-item.interactive, .forecast-nav-btn, .forecast-scroller"))}_renderStatItem(t,e){const i=`stat-${t.index}`,o=qt(t.actionConfig),a=e=>{Kt(this,t.actionConfig,e)};return R`
      <div
        class="stat-item ${o?"interactive":""} ${e?"compact":""}"
        role=${o?"button":K}
        tabindex=${o?"0":K}
        title=${t.label?`${t.label}: ${t.value}${t.unit??""}`:t.entityId}
        @pointerdown=${e=>{o&&(e.stopPropagation(),this._gestureController.handlePointerDown(e,i,t.actionConfig,a))}}
        @pointermove=${t=>{o&&(t.stopPropagation(),this._gestureController.handlePointerMove(t,i))}}
        @pointerup=${e=>{o&&(e.stopPropagation(),this._gestureController.handlePointerUp(e,i,t.actionConfig,a))}}
        @pointercancel=${t=>{o&&(t.stopPropagation(),this._gestureController.handlePointerCancel(i))}}
        @click=${t=>{o&&t.stopPropagation()}}
        @contextmenu=${e=>{o&&(e.stopPropagation(),this._gestureController.handleContextMenu(e,i,t.actionConfig))}}
        @keydown=${t=>{!o||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.stopPropagation(),a("tap"))}}
      >
        ${t.icon?R`<ha-icon class="stat-icon" .icon=${t.icon}></ha-icon>`:K}
        ${t.label&&!e?R`<span class="stat-label">${t.label}</span>`:K}
        <span class="stat-value">
          ${t.value}${t.unit?R`<span class="stat-unit">${t.unit}</span>`:K}
        </span>
      </div>
    `}_scrollForecast(t){const e=this.shadowRoot?.querySelector(".forecast-scroller");if(!e)return;const i=Math.max(.85*e.clientWidth,64);e.scrollBy({left:t*i,behavior:"smooth"})}_renderForecastCard(t,e,i){const o=t.condition?.trim().toLowerCase(),a=Nt(o)?o:"unknown",n=!1===t.is_daytime||"clear-night"===a,r=wt(t,e,this._lang),s="number"==typeof t.temperature&&Number.isFinite(t.temperature)?`${Math.round(t.temperature)}°`:"—",c="number"==typeof t.templow&&Number.isFinite(t.templow)?`${Math.round(t.templow)}°`:void 0,l="hourly"===e&&void 0===c&&"number"==typeof t.precipitation_probability&&t.precipitation_probability>0?`${Math.round(t.precipitation_probability)}%`:void 0;return R`
      <div class="forecast-item ${i}">
        <span class="forecast-label">${r}</span>
        <div class="forecast-icon-wrap">
          ${St(a,n,"forecast-svg",this._t(`conditions.${a}`))}
        </div>
        <div class="forecast-temps">
          <span class="forecast-high">${s}</span>
          ${void 0!==c?R`<span class="forecast-low">${c}</span>`:void 0!==l?R`<span class="forecast-low">${l}</span>`:K}
        </div>
      </div>
    `}_renderNavArrow(t,e){const i=-1===t;return R`
      <button
        type="button"
        class="forecast-nav-btn ${i?"prev":"next"} ${e?"visible":"hidden"}"
        aria-label=${i?"<":">"}
        tabindex=${e?"0":"-1"}
        ?disabled=${!e}
        @pointerdown=${this._stopInteractionPropagation}
        @pointermove=${this._stopInteractionPropagation}
        @pointerup=${this._stopInteractionPropagation}
        @pointercancel=${this._stopInteractionPropagation}
        @click=${e=>{e.stopPropagation(),this._scrollForecast(t)}}
        @keydown=${t=>{t.stopPropagation()}}
      >
        ${i?"‹":"›"}
      </button>
    `}_renderForecastSection(t,e){if(!this._config.show_forecast)return K;if(!t.hasWeatherEntity)return R`
        <div class="forecast-empty">${this._t("card.sensor_only_no_forecast")}</div>
      `;if(this._forecastLoading&&0===this._forecast.length)return R`<div class="forecast-empty">${this._t("card.forecast_loading")}</div>`;if(this._forecastError&&0===this._forecast.length)return R`<div class="forecast-empty">${this._t("card.forecast_error")}</div>`;if(0===this._forecast.length)return K;const i=this._config.forecast_type??"daily",o=function(t,e,i){if(!Array.isArray(t)||0===t.length)return[];const o="hourly"===e?12:7,a="number"==typeof i&&Number.isFinite(i)&&i>0?Math.max(1,Math.floor(i)):o;return t.slice(0,a)}(this._forecast,i,this._config.forecast_items);if(0===o.length)return K;if("horizontal"===e){const t=Math.min(o.length,function(t,e,i,o){const a=Number.isFinite(t)&&t>0?t:480;let n;{const t=a<440?185:210,e=58,i=Math.max(110,a-t);n=Math.floor(i/e)}const r=Math.max(2,Math.min(5,n));return"number"==typeof o&&Number.isFinite(o)&&o>0?Math.max(1,Math.min(Math.floor(o),r)):r}(this._containerWidth,this._containerHeight,0,this._config.forecast_items)),e=o.length>t;return R`
        <div class="forecast-carousel">
          ${e?this._renderNavArrow(-1,this._canScrollPrev):K}
          <div
            class="forecast-scroller horizontal"
            style=${`--spwc-slots: ${t};`}
            @scroll=${this._updateScrollButtons}
            @pointerdown=${this._stopInteractionPropagation}
            @pointermove=${this._stopInteractionPropagation}
            @pointerup=${this._stopInteractionPropagation}
            @pointercancel=${this._stopInteractionPropagation}
            @click=${this._stopInteractionPropagation}
          >
            ${o.map(t=>this._renderForecastCard(t,i,"horizontal"))}
          </div>
          ${e?this._renderNavArrow(1,this._canScrollNext):K}
        </div>
      `}if(o.length<=4)return R`
        <div class="forecast-grid-2col">
          ${o.map(t=>this._renderForecastCard(t,i,"vertical-card"))}
        </div>
      `;const a=[];for(let t=0;t<o.length;t+=4)a.push(o.slice(t,t+4));return R`
      <div class="forecast-carousel vertical-carousel">
        ${this._renderNavArrow(-1,this._canScrollPrev)}
        <div
          class="forecast-scroller vertical-pages"
          @scroll=${this._updateScrollButtons}
          @pointerdown=${this._stopInteractionPropagation}
          @pointermove=${this._stopInteractionPropagation}
          @pointerup=${this._stopInteractionPropagation}
          @pointercancel=${this._stopInteractionPropagation}
          @click=${this._stopInteractionPropagation}
        >
          ${a.map(t=>R`
              <div class="forecast-page">
                ${t.map(t=>this._renderForecastCard(t,i,"vertical-card"))}
              </div>
            `)}
        </div>
        ${this._renderNavArrow(1,this._canScrollNext)}
      </div>
    `}_renderHorizontalLayout(t){const e=this._config.show_icon??!0,i=this._config.show_temperature??!0,o=this._config.show_condition??!0,a=this._config.show_name??!0,n=(this._config.show_stats??!0)&&t.stats.length>0,r=Boolean(this._config.show_forecast),s=this._containerWidth<390,c=this._containerWidth<310,l=t.hasExplicitCondition?t.condition:"thermometer",d=t.unavailable?this._t("card.unavailable"):t.hasExplicitCondition?this._t(`conditions.${t.conditionLabelKey}`):"",p=null!==t.temperature?`${t.temperature}${t.temperatureUnit}`:t.unavailable?"—":K;if(!r)return R`
        <div class="layout-horizontal no-forecast ${s?"narrow":""}">
          <div class="hero-row">
            ${e?R`
                  <div class="hero-icon-wrap ${s?"compact":""}">
                    ${St(l,t.isNight,"hero-svg",d)}
                  </div>
                `:K}
            <div class="hero-primary">
              ${i&&p!==K?R`<div class="temperature ${s?"compact":""}">${p}</div>`:K}
              ${o&&d||a&&t.name&&!c?R`
                    <div class="meta-line">
                      ${o&&d?R`<span class="condition-text">${d}</span>`:K}
                      ${a&&t.name&&!s?R`<span class="location-text">${t.name}</span>`:K}
                    </div>
                  `:K}
            </div>
          </div>
          ${n?R`
                <div class="stats-row ${s?"compact":""}">
                  ${t.stats.map(t=>this._renderStatItem(t,s))}
                </div>
              `:K}
        </div>
      `;const h=this._containerWidth<440;return R`
      <div class="layout-horizontal with-forecast ${h?"compact-side":""}">
        <div class="current-pane">
          <div class="hero-row">
            ${e?R`
                  <div class="hero-icon-wrap ${h?"compact":""}">
                    ${St(l,t.isNight,"hero-svg",d)}
                  </div>
                `:K}
            <div class="hero-primary">
              ${i&&p!==K?R`<div class="temperature ${h?"compact":""}">${p}</div>`:K}
              ${o&&d?R`<div class="condition-text">${d}</div>`:K}
              ${a&&t.name?R`<div class="location-text">${t.name}</div>`:K}
            </div>
          </div>
          ${n?R`
                <div class="stats-row compact">
                  ${t.stats.map(t=>this._renderStatItem(t,!0))}
                </div>
              `:K}
        </div>
        <div class="section-divider vertical"></div>
        <div class="forecast-pane">${this._renderForecastSection(t,"horizontal")}</div>
      </div>
    `}_renderVerticalLayout(t){const e=this._config.show_icon??!0,i=this._config.show_temperature??!0,o=this._config.show_condition??!0,a=this._config.show_name??!0,n=(this._config.show_stats??!0)&&t.stats.length>0,r=Boolean(this._config.show_forecast),s=this._containerHeight<185,c=this._containerWidth<195,l=t.hasExplicitCondition?t.condition:"thermometer",d=t.unavailable?this._t("card.unavailable"):t.hasExplicitCondition?this._t(`conditions.${t.conditionLabelKey}`):"",p=null!==t.temperature?`${t.temperature}${t.temperatureUnit}`:t.unavailable?"—":K;return r?R`
        <div class="layout-vertical with-forecast">
          <div class="vertical-summary">
            <div class="vertical-summary-top">
              ${e?R`
                    <div class="hero-icon-wrap medium">
                      ${St(l,t.isNight,"hero-svg",d)}
                    </div>
                  `:K}
              <div class="vertical-summary-info">
                ${i&&p!==K?R`<div class="temperature medium">${p}</div>`:K}
                ${o&&d?R`<div class="condition-text">${d}</div>`:K}
                ${a&&t.name?R`<div class="location-text">${t.name}</div>`:K}
              </div>
            </div>
            ${n?R`
                  <div class="stats-row compact centered">
                    ${t.stats.map(t=>this._renderStatItem(t,!0))}
                  </div>
                `:K}
          </div>
          <div class="section-divider horizontal"></div>
          <div class="forecast-pane vertical">
            ${this._renderForecastSection(t,"vertical")}
          </div>
        </div>
      `:R`
      <div
        class="layout-vertical no-forecast ${s?"compact-height":"tall"} ${c?"narrow-width":""}"
      >
        <div class="vertical-hero">
          ${e?R`
                <div class="hero-icon-wrap ${s?"compact":"large"}">
                  ${St(l,t.isNight,"hero-svg",d)}
                </div>
              `:K}
          ${i&&p!==K?R`<div class="temperature ${s?"compact":"large"}">${p}</div>`:K}
          ${o&&d?R`<div class="condition-text centered-wrap">${d}</div>`:K}
          ${a&&t.name&&!s?R`<div class="location-text centered-wrap">${t.name}</div>`:K}
        </div>
        ${n?R`
              ${s?K:R`<div class="section-divider horizontal"></div>`}
              <div class="stats-vertical ${s?"inline-wrap":"stacked"}">
                ${t.stats.map(t=>this._renderStatItem(t,s||c))}
              </div>
            `:K}
      </div>
    `}render(){const t=this._config.orientation??"horizontal",e=Wt(this.hass,this._config),i=Rt(e.condition,e.isNight,this._config.background_mode),o=qt(Ut(this._config)),a="horizontal"===t&&Boolean(this._config.show_forecast)&&this._containerWidth<440;return R`
      <ha-card
        class="spwc-card ${this._config.background_mode??"dynamic"} ${o?"interactive":""} ${a?"compact-horizontal-forecast":""}"
        style=${i}
        role=${o?"button":K}
        tabindex=${o?"0":K}
        @pointerdown=${this._onCardPointerDown}
        @pointermove=${this._onCardPointerMove}
        @pointerup=${this._onCardPointerUp}
        @pointercancel=${this._onCardPointerCancel}
        @contextmenu=${this._onCardContextMenu}
        @keydown=${this._onCardKeyDown}
      >
        ${e.hasSource?"vertical"===t?this._renderVerticalLayout(e):this._renderHorizontalLayout(e):R`<div class="empty-state">${this._t("card.no_source")}</div>`}
      </ha-card>
    `}};Yt.styles=r`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    .spwc-card {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 14px;
      border-radius: var(--ha-card-border-radius, 18px);
      background: var(--spwc-bg);
      color: var(--spwc-text);
      border: var(--spwc-border);
      box-shadow: var(--spwc-shadow);
      overflow: hidden;
      transition: background 0.35s ease, color 0.25s ease, border-color 0.25s ease;
      font-family: var(--ha-card-font-family, inherit);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .spwc-card.transparent {
      --ha-card-background: transparent;
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0px;
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .spwc-card.compact-horizontal-forecast {
      padding: 8px 10px;
    }

    .spwc-card.interactive {
      cursor: pointer;
    }

    .empty-state {
      text-align: center;
      font-size: 0.85rem;
      color: var(--spwc-muted);
      padding: 8px;
    }

    /* Typography & Hero elements */
    .hero-row {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .hero-icon-wrap {
      width: 44px;
      height: 44px;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-icon-wrap.compact {
      width: 34px;
      height: 34px;
    }

    .hero-icon-wrap.medium {
      width: 44px;
      height: 44px;
    }

    .hero-icon-wrap.large {
      width: 56px;
      height: 56px;
    }

    .hero-svg,
    .forecast-svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .hero-primary {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 1px;
    }

    .temperature {
      font-size: 1.65rem;
      font-weight: 600;
      line-height: 1.05;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .temperature.compact {
      font-size: 1.32rem;
    }

    .temperature.medium {
      font-size: 1.75rem;
    }

    .temperature.large {
      font-size: 2rem;
    }

    .meta-line {
      display: flex;
      align-items: baseline;
      gap: 6px;
      min-width: 0;
      flex-wrap: wrap;
    }

    .condition-text {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--spwc-text);
      opacity: 0.9;
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .location-text {
      font-size: 0.74rem;
      color: var(--spwc-muted);
      line-height: 1.2;
      overflow-wrap: anywhere;
    }

    .centered-wrap {
      text-align: center;
      white-space: normal;
      max-width: 100%;
    }

    /* Stats */
    .stats-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      min-width: 0;
    }

    .stats-row.centered {
      justify-content: center;
    }

    .stats-row.compact {
      gap: 4px;
    }

    .stat-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--spwc-chip-bg);
      border: 1px solid var(--spwc-chip-border);
      font-size: 0.76rem;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }

    .stat-item.compact {
      padding: 3px 6px;
      font-size: 0.72rem;
      gap: 3px;
    }

    .stat-item.interactive {
      cursor: pointer;
    }

    .stat-item.interactive:hover {
      opacity: 0.88;
    }

    .stat-icon {
      --mdc-icon-size: 14px;
      color: var(--spwc-accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .stat-item.compact .stat-icon {
      --mdc-icon-size: 13px;
    }

    .stat-label {
      color: var(--spwc-muted);
      font-weight: 500;
    }

    .stat-value {
      font-weight: 600;
      color: var(--spwc-text);
    }

    .stat-unit {
      font-weight: 500;
      font-size: 0.9em;
      opacity: 0.85;
      margin-left: 1px;
    }

    /* Horizontal layouts */
    .layout-horizontal.no-forecast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-width: 0;
    }

    .layout-horizontal.no-forecast.narrow {
      gap: 6px;
    }

    .layout-horizontal.no-forecast.narrow .hero-row {
      gap: 7px;
    }

    .layout-horizontal.no-forecast.narrow .stats-row {
      justify-content: flex-end;
      flex-wrap: nowrap;
      overflow: hidden;
    }

    .layout-horizontal.with-forecast {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 12px;
      height: 100%;
      width: 100%;
      min-width: 0;
    }

    .layout-horizontal.with-forecast.compact-side {
      gap: 8px;
    }

    .layout-horizontal.with-forecast.compact-side .current-pane {
      gap: 5px;
      max-width: 44%;
    }

    .layout-horizontal.with-forecast.compact-side .hero-row {
      gap: 6px;
    }

    .layout-horizontal.with-forecast.compact-side .condition-text {
      font-size: 0.76rem;
    }

    .layout-horizontal.with-forecast.compact-side .location-text {
      font-size: 0.68rem;
    }

    .current-pane {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      min-width: 0;
      flex: 0 1 auto;
    }

    .section-divider.vertical {
      width: 1px;
      align-self: stretch;
      background: var(--spwc-divider);
      flex: 0 0 1px;
    }

    .section-divider.horizontal {
      height: 1px;
      width: 100%;
      background: var(--spwc-divider);
      flex: 0 0 1px;
    }

    .forecast-pane {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .forecast-pane.vertical {
      width: 100%;
      flex: 1 1 0;
      min-height: 0;
      align-items: stretch;
      justify-content: stretch;
    }

    .forecast-empty {
      font-size: 0.78rem;
      color: var(--spwc-muted);
      text-align: center;
      width: 100%;
      padding: 4px 6px;
    }

    .forecast-carousel {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .forecast-scroller {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      width: 100%;
      min-width: 0;
      touch-action: pan-x;
    }

    .forecast-scroller::-webkit-scrollbar {
      display: none;
    }

    .forecast-scroller.horizontal {
      align-items: stretch;
      gap: var(--spwc-forecast-gap, 6px);
      height: 100%;
    }

    .forecast-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 4px;
      border-radius: 12px;
      background: var(--spwc-forecast-bg);
      box-sizing: border-box;
      min-width: 0;
    }

    .forecast-item.horizontal {
      flex: 0 0 calc((100% - (var(--spwc-slots, 3) - 1) * var(--spwc-forecast-gap, 6px)) / var(--spwc-slots, 3));
      scroll-snap-align: start;
    }

    .forecast-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      width: 22px;
      height: 22px;
      padding: 0;
      border-radius: 999px;
      border: 1px solid var(--spwc-chip-border);
      background: var(--spwc-chip-bg);
      color: var(--spwc-text);
      backdrop-filter: blur(4px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.18s ease, transform 0.15s ease;
    }

    .forecast-nav-btn.prev {
      left: 2px;
    }

    .forecast-nav-btn.next {
      right: 2px;
    }

    .forecast-nav-btn.visible {
      opacity: 0.88;
    }

    .forecast-nav-btn.visible:hover {
      opacity: 1;
    }

    .forecast-nav-btn.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .forecast-icon-wrap {
      width: 26px;
      height: 26px;
      flex: 0 0 auto;
    }

    .forecast-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--spwc-muted);
      text-transform: capitalize;
      white-space: nowrap;
    }

    .forecast-temps {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }

    .forecast-high {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--spwc-text);
    }

    .forecast-low {
      font-size: 0.71rem;
      color: var(--spwc-muted);
    }

    /* Vertical layouts */
    .layout-vertical.no-forecast {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
      width: 100%;
      gap: 8px;
      min-width: 0;
    }

    .layout-vertical.no-forecast.compact-height {
      gap: 5px;
    }

    .vertical-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 100%;
      min-width: 0;
    }

    .stats-vertical.inline-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
      width: 100%;
    }

    .stats-vertical.stacked {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 6px;
      width: 100%;
    }

    .stats-vertical.stacked .stat-item {
      justify-content: space-between;
      border-radius: 12px;
      padding: 5px 10px;
    }

    .layout-vertical.with-forecast {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
      width: 100%;
      min-width: 0;
    }

    .vertical-summary {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      flex: 0 0 auto;
    }

    .vertical-summary-top {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-width: 0;
    }

    .vertical-summary-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 1px;
    }

    .forecast-grid-2col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      gap: 6px;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .forecast-scroller.vertical-pages {
      align-items: stretch;
      gap: 8px;
      height: 100%;
    }

    .forecast-page {
      flex: 0 0 100%;
      scroll-snap-align: start;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(2, minmax(0, 1fr));
      gap: 6px;
      height: 100%;
      box-sizing: border-box;
    }

    .forecast-item.vertical-card {
      gap: 2px;
      padding: 6px 4px;
      height: 100%;
    }

    .forecast-item.vertical-card .forecast-icon-wrap {
      width: 22px;
      height: 22px;
    }

    .forecast-item.vertical-card .forecast-temps {
      flex-direction: row;
      gap: 5px;
      align-items: baseline;
    }
  `,t([_t({attribute:!1})],Yt.prototype,"hass",void 0),t([mt()],Yt.prototype,"_config",void 0),t([mt()],Yt.prototype,"_forecast",void 0),t([mt()],Yt.prototype,"_forecastLoading",void 0),t([mt()],Yt.prototype,"_forecastError",void 0),t([mt()],Yt.prototype,"_containerWidth",void 0),t([mt()],Yt.prototype,"_containerHeight",void 0),t([mt()],Yt.prototype,"_canScrollPrev",void 0),t([mt()],Yt.prototype,"_canScrollNext",void 0),Yt=t([pt("simple-pastel-weather-card")],Yt);const Xt=window;Xt.customCards=Xt.customCards||[],Xt.customCards.some(t=>"simple-pastel-weather-card"===t.type)||Xt.customCards.push({type:"simple-pastel-weather-card",name:"Simple Pastel Weather Card",preview:!0,description:"Minimalist pastel weather card with custom SVG icons, custom sensors, horizontal/vertical layouts, dynamic day/night backgrounds, and transparent mode."});export{Yt as SimplePastelWeatherCard};
