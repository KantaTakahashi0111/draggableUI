import React, { Component } from "react";

import KensanHeader from "./KensanHeader";
import SetWorkSpace from "./SetWorkSpace";
import ItemWorkSpace from "./ItemWorkSpace";

class App extends Component {
	render() {
		return (
			<div className="kensanApp">
				<KensanHeader />
				<SetWorkSpace />
				<ItemWorkSpace />
			</div>
		);
	}
}

export default App;
