# webp-animation-info

A library to calculate animation information for WebP files in the browser.

## Usage

Use either the default import or destructure.

```typescript
import { webPAnimationInfo } from "webp-animation-info";
import webPAnimationInfo from "webp-animation-info";
```

Then call with a file as argument and receive a promise which may resolve to a `results` object.

```typescript
webPAnimationInfo(event.target.files?.[0])
  .then((results) => {
    console.log(`${results.isAnimated}
${results.loops}
${results.totalDuration}`); // if isAnimated is true, 0 value for loops means infinite loops
    results.frameDurations.forEach((frameDuration) => {
      console.log(`${frameDuration}`);
    });
  })
  .catch((error) => {
    console.error(error); // the calculation may encounter and throw errors
  });
```
