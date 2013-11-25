/**
 * @fileOverview
 * shape.enchant.js
 * @version 1.1
 * @requries enchant.js v0.8.0 or later
 * @author daishi_hmr
 * 
 * @description
 * Simple shape sprite plugin.
 *
 * @example
 * // create rectangle. width=80, height=40.
 * ver rect = new Rectangle(80, 40);
 *
 * // create triangle. radius=30, color=red.
 * ver tri = new Triangle(30, {
 *     fillStyle: "rgb(255, 0, 0)"
 * });
 */

/**
 * @namespace
 * @type {Object}
 */
enchant.shape = enchant.shape || {};

(function() {

enchant.shape.DEFAULT_OPTIONS = {
    lineWidth: 3,
    strokeStyle: "white",
    fillStyle: "red"
};

var extend = function(orig, over) {
    if (!over) return orig;

    var result = {};
    for (var key in orig) if (orig.hasOwnProperty(key)) {
        result[key] = orig[key];
    }
    for (var key in over) if (over.hasOwnProperty(key)) {
        result[key] = over[key];
    }
    return result;
};

/**
 * Rectangle shape sprite.
 * @scope enchant.shape.Rectangle.prototype
 */
enchant.shape.Rectangle = enchant.Class.create(enchant.Sprite, {
    /**
     * @constructs
     * @param width
     * @param height
     * @param options lineWidth, strokeStyle, fillStyle
     */
    initialize: function(width, height, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(width, height);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;
        context.rect(context.lineWidth, context.lineWidth, width-context.lineWidth*2, height-context.lineWidth*2);
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});

/**
 * Polygon shape sprite.
 * @scope enchant.shape.Polygon.prototype
 */
enchant.shape.Polygon = enchant.Class.create(enchant.Sprite, {
    /**
     * @constructs
     * @param radius
     * @param options lineWidth, strokeStyle, fillStyle, sides, offsetAngle
     */ 
    initialize: function(radius, options) {
        options = extend(enchant.shape.Polygon.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(radius*2, radius*2);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;

        var radius0 = radius - context.lineWidth;
        var oa = options.offsetAngle - Math.PI/2;

        context.beginPath();
        context.moveTo(radius + Math.cos(oa)*radius0, radius + Math.sin(oa)*radius0);
        for (var i = 1; i < options.sides; i++) {
            var a = 2*Math.PI / options.sides * i + oa;
            context.lineTo(radius + Math.cos(a)*radius0, radius + Math.sin(a)*radius0);
        }
        context.closePath();
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});
enchant.shape.Polygon.DEFAULT_OPTIONS = extend(enchant.shape.DEFAULT_OPTIONS, {
    sides: 6,
    offsetAngle: 0
});

/**
 * Triangle shape sprite.
 * @scope enchant.shape.Triangle.prototype
 */
enchant.shape.Triangle = enchant.Class.create(enchant.shape.Polygon, {
    /**
     * @constructs
     * @param radius
     * @param options lineWidth, strokeStyle, fillStyle, offsetAngle
     */
    initialize: function(radius, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);
        options.sides = 3;
        enchant.shape.Polygon.call(this, radius, options);
    }
});

/**
 * Circle shape sprite.
 * @scope enchant.shape.Circle.prototype
 */
enchant.shape.Circle = enchant.Class.create(enchant.Sprite, {
    /**
     * @constructs
     * @param radius
     * @param options lineWidth, strokeStyle, fillStyle
     */
    initialize: function(radius, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(radius*2, radius*2);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;
        context.arc(radius, radius, radius-context.lineWidth, 0, 2*Math.PI);
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});

/**
 * Star shape sprite.
 * @scope enchant.shape.Star.prototype
 */
enchant.shape.Star = enchant.Class.create(enchant.Sprite, {
    /**
     * @constructs
     * @param radius
     * @param options lineWidth, strokeStyle, fillStyle, sides, sideIndent, offsetAngle
     */
    initialize: function(radius, options) {
        options = extend(enchant.shape.Star.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(radius*2, radius*2);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;

        var radiusO = radius - context.lineWidth;
        var radiusI = radiusO * options.sideIndent;

        var angleUnit = 2*Math.PI / options.sides;
        var oa = options.offsetAngle - Math.PI/2;

        context.beginPath();
        context.moveTo(radius + Math.cos(oa)*radiusO, radius + Math.sin(oa)*radiusO);
        context.lineTo(radius + Math.cos(oa+angleUnit/2)*radiusI, radius + Math.sin(oa+angleUnit/2)*radiusI);
        for (var i = 1; i < options.sides; i++) {
            var a = angleUnit * i;
            context.lineTo(radius + Math.cos(a+oa)*radiusO, radius + Math.sin(a+oa)*radiusO);
            context.lineTo(radius + Math.cos(a+oa+angleUnit/2)*radiusI, radius + Math.sin(a+oa+angleUnit/2)*radiusI);
        }
        context.closePath();
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});
enchant.shape.Star.DEFAULT_OPTIONS = extend(enchant.shape.DEFAULT_OPTIONS, {
    sides: 5,
    sideIndent: 0.38,
    offsetAngle: 0
});

})();
