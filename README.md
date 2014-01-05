shape.enchant.js
================

http://daishihmr.github.io/shape.enchant.js/

download
--------
https://github.com/daishihmr/shape.enchant.js/archive/1.1.zip

licence
-------
MIT licence (copyright daishi_hmr)

how to use
----------

```js
    // 矩形
    var rectangle = new Rectangle(50, 30);
    rectangle.moveTo(50, 50);
    scene.addChild(rectangle);

    // 三角形（緑色で塗りつぶし）
    var triangle = new Triangle(25, {
        fillStyle: "green"
    });
    triangle.moveTo(110, 50);
    scene.addChild(triangle);

    // 円（グラデーションで塗りつぶし）
    var circle = new Circle(25, {
        strokeStyle: "transparent",
        fillStyle: (function() {
            var gra = new Surface(50, 50).context.createRadialGradient(20, 20, 0, 20, 20, 75);
            gra.addColorStop(0.0, "#ffffff");
            gra.addColorStop(0.5, "#006600");
            return gra;
        })()
    });
    circle.moveTo(170, 50);
    scene.addChild(circle);

    // 正多角形（正8角形）
    var polygon = new Polygon(25, {
        fillStyle: "blue",
        lineWidth: 1,
        sides: 8
    });
    polygon.moveTo(230, 50);
    scene.addChild(polygon);

    // 星形
    var star = new Star(25, {
        fillStyle: "orange",
        sideIndent: 0.6
    });
    star.moveTo(290, 50);
    scene.addChild(star);
```
