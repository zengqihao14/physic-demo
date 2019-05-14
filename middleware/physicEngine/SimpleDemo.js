import {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  World,
  Bodies
} from 'matter-js';

import {
  DEFAULT_OPTIONS,
  DEFAULT_WALL_OPTIONS,
  DEFAULT_BODY_STYLE
} from '~/constant';

export default class SimpleDemoEngine {
  constructor(bodyEl, options) {
    this.body = this.getBody(bodyEl);
    this.init();
  }

  getBody = (el) => ({
    el,
    X: el.offsetWidth,
    Y: el.offsetHeight
  });

  init = () => {
    // create engine
    this.engine = Engine.create();

    // create world
    this.world = this.engine.world;

    // create renderer
    this.render = Render.create({
      element: this.body.el,
      engine: this.engine,
      options: Object.assign(DEFAULT_OPTIONS, {
        width: this.body.X,
        height: this.body.Y
      })
    });

    // create runner
    this.runner = Runner.create();

    // add mouse control
    this.mouse = Mouse.create(this.render.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    // keep the mouse in sync with rendering
    this.render.mouse = this.mouse;
    World.add(this.world, this.mouseConstraint);
    this.createWall();
    this.createSolid();
  };

  createWall = () => {
    World.add(this.world, [
      Bodies.rectangle(this.body.X / 2, 0, this.body.X, 30, DEFAULT_WALL_OPTIONS),
      Bodies.rectangle(this.body.X / 2, this.body.Y, this.body.X, 30, DEFAULT_WALL_OPTIONS),
      Bodies.rectangle(this.body.X, this.body.Y / 2, 30, this.body.Y, DEFAULT_WALL_OPTIONS),
      Bodies.rectangle(0, this.body.Y / 2, 30, this.body.Y, DEFAULT_WALL_OPTIONS)
    ]);
  };

  createSolid = () => {
    const positionX = Math.min(Math.max(Math.random() * this.body.X, 30), this.body.X - 30);
    World.add(this.world, [
      Bodies.rectangle(positionX, 60, 60, 60, {
        render: DEFAULT_BODY_STYLE.RENDER
      }),
    ]);

  };

  run = () => {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);

    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: this.body.X, y: this.body.Y }
    });
  };

  stop = () => {
    Render.stop(this.render);
    Runner.stop(this.runner);
  };

  reset = () => {
    this.world.bodies = [];
    this.createWall();
  };
}
