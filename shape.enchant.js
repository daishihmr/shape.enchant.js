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

enchant.shape.Rectangle = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(width, height);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;
        context.rect(context.lineWidth/2, context.lineWidth/2, width-context.lineWidth, height-context.lineWidth);
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});

enchant.shape.Polygon = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, options) {
        options = extend(enchant.shape.Polygon.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(width, height);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;

        var radius = Math.min(width, height)/2 - context.lineWidth/2;
        var oa = options.offsetAngle - Math.PI/2;

        context.beginPath();
        context.moveTo(width/2 + Math.cos(oa)*radius, height/2 + Math.sin(oa)*radius);
        for (var i = 1; i < options.sides; i++) {
            var a = 2*Math.PI / options.sides * i + oa;
            context.lineTo(width/2 + Math.cos(a)*radius, height/2 + Math.sin(a)*radius);
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

enchant.shape.Triangle = enchant.Class.create(enchant.shape.Polygon, {
    initialize: function(width, height, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);
        options.sides = 3;
        enchant.shape.Polygon.call(this, width, height, options);
    }
});

enchant.shape.Circle = enchant.Class.create(enchant.Sprite, {
    initialize: function(radius, options) {
        options = extend(enchant.shape.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(radius*2, radius*2);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;
        context.arc(radius, radius, radius-context.lineWidth/2, 0, 2*Math.PI);
        context.fill();
        context.stroke();

        enchant.Sprite.call(this, texture.width, texture.height);
        this.image = texture;
    }
});

enchant.shape.Star = enchant.Class.create(enchant.Sprite, {
    initialize: function(width, height, options) {
        options = extend(enchant.shape.Star.DEFAULT_OPTIONS, options);

        var texture = new enchant.Surface(width, height);
        var context = texture.context;
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.strokeStyle;
        context.fillStyle = options.fillStyle;

        var radiusO = Math.min(width, height)/2 - context.lineWidth/2;
        var radiusI = radiusO * options.sideIndent;

        var angleUnit = 2*Math.PI / options.sides;
        var oa = options.offsetAngle - Math.PI/2;

        context.beginPath();
        context.moveTo(width/2 + Math.cos(oa)*radiusO, height/2 + Math.sin(oa)*radiusO);
        context.lineTo(width/2 + Math.cos(oa+angleUnit/2)*radiusI, height/2 + Math.sin(oa+angleUnit/2)*radiusI);
        for (var i = 1; i < options.sides; i++) {
            var a = angleUnit * i;
            context.lineTo(width/2 + Math.cos(a+oa)*radiusO, height/2 + Math.sin(a+oa)*radiusO);
            context.lineTo(width/2 + Math.cos(a+oa+angleUnit/2)*radiusI, height/2 + Math.sin(a+oa+angleUnit/2)*radiusI);
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
