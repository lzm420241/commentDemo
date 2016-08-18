class StoryBox extends React.Component {
	render() {
		const now = new Date();
		return ( <div>
			<h3>Story Box</h3>
			<p className="lead">Current time: {now.toTimeString()}</p>
		</div> );
	}
}
ReactDOM.render(
	<StoryBox />, document.getElementById('story-app')
);