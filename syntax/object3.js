var o = {
  v1: "v1",
  v2: "v2",
  f: function () {
    console.log(this.v1);
  },
  f2: function () {
    console.log(this.v2);
  },
};

o.f();
o.f2();
