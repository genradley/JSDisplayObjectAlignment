/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/Align
 */

/**
 * Get and optionally set the x or y alignment of a child display object.
 * Can add child to parent.
 */
class Align {

  /**
   * Calculate the x position based on two widths and whether you want
   * center, left, or right alignment. Optionally pass in the actual x
   * position you want instead of getting a calculation based on relation. If
   * the child is a display object, the x position will be set. Optionally
   * add the child to the parent.
   * @param {DisplayObject|number} parent - Parent display object or the
   *     width of the parent.
   * @param {DisplayObject|number} child - Child display object or the width
   *     of the child.
   * @param {string|number} [alignX=0] - Align.CENTER, Align.LEFT,
   *     Align.RIGHT, or the actual x value.
   * @param {number} [padding=0] - If LEFT, the space between the left edge
   *     and x. If RIGHT, the space between the right edge and the end of the
   *     child"s width.
   * @param {boolean} [addChild=false] - Whether you want the child to be
   *     added to the parent. Only if parent and child are display objects.
   * @returns {number} The x value.
   */
  static alignX(parent, child, alignX = 0, padding = 0, addChild = false) {
    return Align.align("x", parent, child, alignX, padding, addChild);
  }

  /**
   * Calculate the y position based on two heights and whether you want
   * center, top, or bottom alignment. Optionally pass in the actual y
   * position you want instead of getting a calculation based on relation. If
   * the child is a display object, the y position will be set. Optionally
   * add the child to the parent.
   * @param {DisplayObject|number} parent - Parent display object or the
   *     height of the parent.
   * @param {DisplayObject|number} child - Child display object or the height
   *     of the child.
   * @param {string|number} [alignY=0] - Align.CENTER, Align.TOP,
   *     Align.BOTTOM, or the actual y value.
   * @param {number} [padding=0] - If TOP, the space between the top edge and
   *     y. If BOTTOM, the space between the bottom edge and the end of the
   *     child"s height.
   * @param {boolean} [addChild=false] - Whether you want the child to be
   *     added to the parent. Only if parent and child are display objects.
   * @returns {number} The y value.
   */
  static alignY(parent, child, alignY = 0, padding = 0, addChild = false) {
    return Align.align("y", parent, child, alignY, padding, addChild);
  }

  /**
   * Calculate the x and y position of a child display object relative to the
   * parent. Either center, left, right, top, or bottom alignment. Optionally
   * pass in the actual x and/or y position you want instead of getting a
   * calculation based on relation. The x and y positions of the child
   * display object will be set. Optionally add the child to the parent.
   * @param {DisplayObject|number} parent - Parent display object.
   * @param {DisplayObject|number} child - Child display.
   * @param {string|number} [alignX=0] - Align.CENTER, Align.LEFT,
   *     Align.RIGHT, or the actual x value.
   * @param {string|number} [alignY=0] - Align.CENTER, Align.TOP,
   *     Align.BOTTOM, or the actual y value.
   * @param {number} [paddingX=0] - If LEFT, the space between the left edge
   *     and x. If RIGHT, the space between the right edge and the end of the
   *     child"s width.
   * @param {number} [paddingY=0] - If TOP, the space between the top edge
   *     and y. If BOTTOM, the space between the bottom edge and the end of
   *     the child"s height.
   * @param {boolean} [addChild=false] - Whether you want the child to be
   *     added to the parent. Only if parent and child are display objects.
   */
  static alignXandY(parent, child, alignX = 0, alignY = 0, paddingX = 0, paddingY = 0, addChild = false) {
    Align.alignX(parent, child, alignX, paddingX, false);
    Align.alignY(parent, child, alignY, paddingY, addChild);
  }

  /**
   * Private utility function for Align methods.
   * @param {string} axis = "x" or "y"
   * @param {DisplayObject|number} parent - Parent display object or the size
   *     (width or height depending on the axis) of the parent.
   * @param {DisplayObject|number} child - Child display object or the size
   *     (width or height depending on the axis) of the child.
   * @param {string|number} [alignDesired=0] - Align.CENTER, Align.LEFT,
   *     Align.RIGHT, Align.TOP, Align.BOTTOM, or the actual value for the axis.
   * @param {number} [padding=0] - space between.
   * @param {boolean} [addChild=false] - Whether you want the child to be added
   *     to the parent. Only if parent and child are display objects.
   * @returns {*}
   */
  static align(axis, parent, child, alignDesired = 0, padding = 0, addChild = false) {
// TODO: for some reason x or y is undefined if I don"t set it (sprite.align).
// should be 0.
    let leftOrTop = (axis === "x") ? Align.LEFT : Align.TOP;
    let rightOrBottom = (axis === "x") ? Align.RIGHT : Align.BOTTOM;

    let parentSize;
    let childSize;

    if (typeof parent === "undefined" || parent === null || typeof child === "undefined" || child === null) {
      console.log("Align.align() - Error: parent or child is null or undefined");
      return;
    }

    let retVal;

    if (alignDesired !== Align.CENTER && alignDesired !== leftOrTop && alignDesired !== rightOrBottom) {
      if (typeof alignDesired !== "number") {
        retVal = 0;
      }
    }

    if (typeof padding !== "number") {
      padding = 0;
    }

    if (typeof addChild !== "boolean") {
      addChild = false;
    }

    if (axis !== "x" && axis !== "y") {
      console.log("Align.align() - Error: axis must be 'x' or 'y'");
      return;
    }

    if (axis === "x") {
      parentSize = (typeof parent === "number") ? parent : parent.width;
      childSize = (typeof child === "number") ? child : child.width;
    } else {
      parentSize = (typeof parent === "number") ? parent : parent.height;
      childSize = (typeof child === "number") ? child : child.height;
    }

    switch (alignDesired) {
      case Align.CENTER:
        retVal = (parentSize * 0.5) - (childSize * 0.5) + padding;
        break;
      case leftOrTop:
        retVal = padding;
        break;
      case rightOrBottom:
        if (parentSize > childSize) {
          retVal = parentSize - childSize - padding;
        } else {
          retVal = -(childSize - parentSize) - padding;
        }
        break;
      default:
        // alignDesired must already be a number if this default case is hit
        retVal = alignDesired;
    }

    // TODO: Wish I could type check the parent and child for being
    // PIXI.DisplayObjectContainer.
    if (typeof child !== "number" && typeof parent !== "number") {
      if (axis === "x") {
        child.x = retVal;
      } else {
        child.y = retVal;
      }
      if (addChild && !(addChild.parent && addChild.parent === parent)) {
        parent.addChild(child);
      }
    }
    return retVal;
  }
}

Object.defineProperties(Align, {
  "CENTER": {
    value: "center",
    writable: false,
    enumerable: true,
    configurable: false
  },
  "LEFT": {
    value: "left",
    writable: false,
    enumerable: true,
    configurable: false
  },
  "RIGHT": {
    value: "right",
    writable: false,
    enumerable: true,
    configurable: false
  },
  "TOP": {
    value: "top",
    writable: false,
    enumerable: true,
    configurable: false
  },
  "BOTTOM": {
    value: "bottom",
    writable: false,
    enumerable: true,
    configurable: false
  }
});

export default Align;