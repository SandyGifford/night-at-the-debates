console.clear();

import * as React from "react";
import * as ReactDOM from "react-dom";
import DevApp from "@devComponents/DevApp/DevApp";

const target = document.createElement("div");
document.body.appendChild(target);

ReactDOM.render(<DevApp />, target);
