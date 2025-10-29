import{R as se,I as oe,F as V,a as H,b as C,W as re,B as N,S as Q,V as _,c as ae,U as F,d as k,e as Z,M as ce,f as B,L as le,g as de,h as fe,r as m,u as ue,C as pe,_ as q,j as v,i as he,O as me,k as ve,T as ge}from"./index-DHe8NI5m.js";const ee=parseInt(se.replace(/\D+/g,"")),te=ee>=125?"uv1":"uv2",$=new N,O=new _;class W extends oe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new V(t,3)),this.setAttribute("uv",new V(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,s=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),s.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new H(e,6,1);return this.setAttribute("instanceStart",new C(s,3,0)),this.setAttribute("instanceEnd",new C(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t,e=3){let s;t instanceof Float32Array?s=t:Array.isArray(t)&&(s=new Float32Array(t));const n=new H(s,e*2,1);return this.setAttribute("instanceColorStart",new C(n,e,0)),this.setAttribute("instanceColorEnd",new C(n,e,e)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new re(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new N);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),$.setFromBufferAttribute(e),this.boundingBox.union($))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Q),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let n=0;for(let i=0,a=t.count;i<a;i++)O.fromBufferAttribute(t,i),n=Math.max(n,s.distanceToSquared(O)),O.fromBufferAttribute(e,i),n=Math.max(n,s.distanceToSquared(O));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class ne extends W{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,s=new Float32Array(2*e);for(let n=0;n<e;n+=3)s[2*n]=t[n],s[2*n+1]=t[n+1],s[2*n+2]=t[n+2],s[2*n+3]=t[n+3],s[2*n+4]=t[n+4],s[2*n+5]=t[n+5];return super.setPositions(s),this}setColors(t,e=3){const s=t.length-e,n=new Float32Array(2*s);if(e===3)for(let i=0;i<s;i+=e)n[2*i]=t[i],n[2*i+1]=t[i+1],n[2*i+2]=t[i+2],n[2*i+3]=t[i+3],n[2*i+4]=t[i+4],n[2*i+5]=t[i+5];else for(let i=0;i<s;i+=e)n[2*i]=t[i],n[2*i+1]=t[i+1],n[2*i+2]=t[i+2],n[2*i+3]=t[i+3],n[2*i+4]=t[i+4],n[2*i+5]=t[i+5],n[2*i+6]=t[i+6],n[2*i+7]=t[i+7];return super.setColors(n,e),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}class G extends ae{constructor(t){super({type:"LineMaterial",uniforms:F.clone(F.merge([k.common,k.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Z(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${ee>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}}const T=new B,X=new _,J=new _,l=new B,d=new B,x=new B,R=new _,I=new de,f=new le,Y=new _,D=new N,P=new Q,w=new B;let b,A;function K(r,t,e){return w.set(0,0,-t,1).applyMatrix4(r.projectionMatrix),w.multiplyScalar(1/w.w),w.x=A/e.width,w.y=A/e.height,w.applyMatrix4(r.projectionMatrixInverse),w.multiplyScalar(1/w.w),Math.abs(Math.max(w.x,w.y))}function ye(r,t){const e=r.matrixWorld,s=r.geometry,n=s.attributes.instanceStart,i=s.attributes.instanceEnd,a=Math.min(s.instanceCount,n.count);for(let o=0,p=a;o<p;o++){f.start.fromBufferAttribute(n,o),f.end.fromBufferAttribute(i,o),f.applyMatrix4(e);const y=new _,g=new _;b.distanceSqToSegment(f.start,f.end,g,y),g.distanceTo(y)<A*.5&&t.push({point:g,pointOnLine:y,distance:b.origin.distanceTo(g),object:r,face:null,faceIndex:o,uv:null,[te]:null})}}function Se(r,t,e){const s=t.projectionMatrix,i=r.material.resolution,a=r.matrixWorld,o=r.geometry,p=o.attributes.instanceStart,y=o.attributes.instanceEnd,g=Math.min(o.instanceCount,p.count),u=-t.near;b.at(1,x),x.w=1,x.applyMatrix4(t.matrixWorldInverse),x.applyMatrix4(s),x.multiplyScalar(1/x.w),x.x*=i.x/2,x.y*=i.y/2,x.z=0,R.copy(x),I.multiplyMatrices(t.matrixWorldInverse,a);for(let S=0,z=g;S<z;S++){if(l.fromBufferAttribute(p,S),d.fromBufferAttribute(y,S),l.w=1,d.w=1,l.applyMatrix4(I),d.applyMatrix4(I),l.z>u&&d.z>u)continue;if(l.z>u){const c=l.z-d.z,h=(l.z-u)/c;l.lerp(d,h)}else if(d.z>u){const c=d.z-l.z,h=(d.z-u)/c;d.lerp(l,h)}l.applyMatrix4(s),d.applyMatrix4(s),l.multiplyScalar(1/l.w),d.multiplyScalar(1/d.w),l.x*=i.x/2,l.y*=i.y/2,d.x*=i.x/2,d.y*=i.y/2,f.start.copy(l),f.start.z=0,f.end.copy(d),f.end.z=0;const U=f.closestPointToPointParameter(R,!0);f.at(U,Y);const M=fe.lerp(l.z,d.z,U),L=M>=-1&&M<=1,j=R.distanceTo(Y)<A*.5;if(L&&j){f.start.fromBufferAttribute(p,S),f.end.fromBufferAttribute(y,S),f.start.applyMatrix4(a),f.end.applyMatrix4(a);const c=new _,h=new _;b.distanceSqToSegment(f.start,f.end,h,c),e.push({point:h,pointOnLine:c,distance:b.origin.distanceTo(h),object:r,face:null,faceIndex:S,uv:null,[te]:null})}}}class ie extends ce{constructor(t=new W,e=new G({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,s=t.attributes.instanceEnd,n=new Float32Array(2*e.count);for(let a=0,o=0,p=e.count;a<p;a++,o+=2)X.fromBufferAttribute(e,a),J.fromBufferAttribute(s,a),n[o]=o===0?0:n[o-1],n[o+1]=n[o]+X.distanceTo(J);const i=new H(n,2,1);return t.setAttribute("instanceDistanceStart",new C(i,1,0)),t.setAttribute("instanceDistanceEnd",new C(i,1,1)),this}raycast(t,e){const s=this.material.worldUnits,n=t.camera;n===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=t.params.Line2!==void 0&&t.params.Line2.threshold||0;b=t.ray;const a=this.matrixWorld,o=this.geometry,p=this.material;A=p.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),P.copy(o.boundingSphere).applyMatrix4(a);let y;if(s)y=A*.5;else{const u=Math.max(n.near,P.distanceToPoint(b.origin));y=K(n,u,p.resolution)}if(P.radius+=y,b.intersectsSphere(P)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),D.copy(o.boundingBox).applyMatrix4(a);let g;if(s)g=A*.5;else{const u=Math.max(n.near,D.distanceToPoint(b.origin));g=K(n,u,p.resolution)}D.expandByScalar(g),b.intersectsBox(D)!==!1&&(s?ye(this,e):Se(this,n,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(T),this.material.uniforms.resolution.value.set(T.z,T.w))}}class xe extends ie{constructor(t=new ne,e=new G({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}}const we=m.forwardRef(function({points:t,color:e=16777215,vertexColors:s,linewidth:n,lineWidth:i,segments:a,dashed:o,...p},y){var g,u;const S=ue(L=>L.size),z=m.useMemo(()=>a?new ie:new xe,[a]),[E]=m.useState(()=>new G),U=(s==null||(g=s[0])==null?void 0:g.length)===4?4:3,M=m.useMemo(()=>{const L=a?new W:new ne,j=t.map(c=>{const h=Array.isArray(c);return c instanceof _||c instanceof B?[c.x,c.y,c.z]:c instanceof Z?[c.x,c.y,0]:h&&c.length===3?[c[0],c[1],c[2]]:h&&c.length===2?[c[0],c[1],0]:c});if(L.setPositions(j.flat()),s){e=16777215;const c=s.map(h=>h instanceof pe?h.toArray():h);L.setColors(c.flat(),U)}return L},[t,a,s,U]);return m.useLayoutEffect(()=>{z.computeLineDistances()},[t,z]),m.useLayoutEffect(()=>{o?E.defines.USE_DASH="":delete E.defines.USE_DASH,E.needsUpdate=!0},[o,E]),m.useEffect(()=>()=>{M.dispose(),E.dispose()},[M]),m.createElement("primitive",q({object:z,ref:y},p),m.createElement("primitive",{object:M,attach:"geometry"}),m.createElement("primitive",q({object:E,attach:"material",color:e,vertexColors:!!s,resolution:[S.width,S.height],linewidth:(u=n??i)!==null&&u!==void 0?u:1,dashed:o,transparent:U===4},p)))}),be=({position:r,color:t,label:e,onClick:s})=>{const n=m.useRef(null),[i,a]=m.useState(!1);return ve(o=>{n.current&&n.current.scale.setScalar(i?1.3:1)}),v.jsxs("group",{position:r,children:[v.jsxs("mesh",{ref:n,onClick:s,onPointerOver:()=>a(!0),onPointerOut:()=>a(!1),children:[v.jsx("sphereGeometry",{args:[.3,32,32]}),v.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.3})]}),v.jsx(ge,{position:[0,-.6,0],fontSize:.2,color:"white",anchorX:"center",anchorY:"middle",children:e})]})},_e=({start:r,end:t,strength:e})=>v.jsx(we,{points:[r,t],color:"#a855f7",lineWidth:e*3,transparent:!0,opacity:.4}),Le=()=>{const r=m.useMemo(()=>Array.from({length:10},(n,i)=>{const a=i/10*Math.PI*2,o=(Math.random()-.5)*2;return{id:`Product ${String.fromCharCode(65+i)}`,position:[Math.cos(a)*4,o,Math.sin(a)*4],color:`hsl(${i*360/10}, 70%, 60%)`}}),[]),t=m.useMemo(()=>r.flatMap((e,s)=>r.slice(s+1).map(n=>({start:e.position,end:n.position,strength:Math.random()}))),[r]);return v.jsx("div",{className:"h-[600px] w-full bg-gradient-to-b from-background to-card rounded-xl overflow-hidden",children:v.jsxs(he,{camera:{position:[0,5,10],fov:60},children:[v.jsx("ambientLight",{intensity:.4}),v.jsx("pointLight",{position:[10,10,10],intensity:1}),v.jsx("pointLight",{position:[-10,-10,-10],intensity:.5,color:"#a855f7"}),t.map((e,s)=>v.jsx(_e,{...e},s)),r.map(e=>v.jsx(be,{position:e.position,color:e.color,label:e.id,onClick:()=>console.log(`Clicked ${e.id}`)},e.id)),v.jsx(me,{enableDamping:!0,dampingFactor:.05,autoRotate:!0,autoRotateSpeed:.5})]})})};export{Le as ProductNetwork3D};
