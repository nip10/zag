# @zag-js/tabbable

## 0.10.2

### Patch Changes

- Updated dependencies []:
  - @zag-js/dom-query@0.10.2

## 0.10.1

### Patch Changes

- Updated dependencies []:
  - @zag-js/dom-query@0.10.1

## 0.10.0

### Patch Changes

- Updated dependencies [[`e8ac03ef`](https://github.com/chakra-ui/zag/commit/e8ac03ef4b820773a5875db861735e2aac8f29da)]:
  - @zag-js/dom-query@0.10.0

## 0.9.2

### Patch Changes

- Updated dependencies []:
  - @zag-js/dom-query@0.9.2

## 0.9.1

### Patch Changes

- [`8469daa1`](https://github.com/chakra-ui/zag/commit/8469daa15fd7f2c0a80869a8715b0342bd3c355f) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Force release every package to fix regression

- Updated dependencies [[`8469daa1`](https://github.com/chakra-ui/zag/commit/8469daa15fd7f2c0a80869a8715b0342bd3c355f)]:
  - @zag-js/dom-query@0.9.1

## 0.8.0

### Patch Changes

- [`fb4fb42d`](https://github.com/chakra-ui/zag/commit/fb4fb42d8aacc5844945dd7b1bd27b94c978ca4e) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add support for `defer` option to allow defering the execution of
  a function to the next tick

## 0.1.1

### Patch Changes

- [`33d96b0d`](https://github.com/chakra-ui/zag/commit/33d96b0d927868a17d0e8e0298d5b34e82eed540) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Improve `proxyTabFocus` logic to account for empty tabbable
  elements within container

## 0.1.0

### Minor Changes

- [`316eea98`](https://github.com/chakra-ui/zag/commit/316eea980af3a276ec3b0bd900b9e705f59f7c35) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add `proxyTabFocus` helper to manage focus within a portal.

  This helper will listen to tab key events and manage focus between the container, reference and the next tabbble
  element in DOM sequence.

  ```js
  import { proxyTabFocus } from "@zag-js/tabbable"

  export function App() {
    const referenceRef = useRef()
    const containerRef = useRef()

    useEffect(() => {
      const focusElement = (el) => el.focus({ preventScroll: true })
      return proxyTabFocus(containerRef.current, referenceRef.current, focusElement)
    }, [])

    return (
      <div>
        <button ref={referenceRef}>Click me</button>
        <Portal>
          <div ref={containerRef}>
            <button>First</button>
            <button>Last</button>
          </div>
        </Portal>
        <button>Outside</button>
      </div>
    )
  }
  ```

  Add `getTabbableEdges` helper to get the first and last tabbable elements

## 0.0.1

### Patch Changes

- [#536](https://github.com/chakra-ui/zag/pull/536)
  [`aabc9aed`](https://github.com/chakra-ui/zag/commit/aabc9aed93ae3f49e2cec8d8b28edd23a337ce99) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Refactor all packages to have proper dependency structure and
  bundle size.
