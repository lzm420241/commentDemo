class Comment extends React.Component {

	_handleDelete(event) {
		event.preventDefault();
		if(confirm('Are you sure?')){
			this.props.onDelete(this.props.comment);
		}
	}

	render() {
		return (
			<div className="comment">
				<p className="comment-header">{this.props.author}</p>
				<p className="comment-body">
					{this.props.body}
				</p>
				<div className="comment-footer">
					<a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)} >
						Delete comment
					</a>
				</div>
			</div>
		)
	}
}


class CommentForm extends React.Component {

	_handleSubmit(event) {
	event.preventDefault();

	let author = this._author;
	let body = this._body;
	this.porps.addComment(author.value, body.value);
}

	render() {
		return (
			<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
				<label>Join the discussion</label>
				<div className="comment-form-fields">
					<input placeholder="Name:" ref={(input) => this._author = input} />
					<textarea placeholder="Comment:" ref={(textarea) => this._body = textarea} ></textarea>
				</div>
				<div className="comment-form-actions">
					<button type="submit">
						Post comment
					</button>
				</div>
			</form>
		)
	}
}

class CommentBox extends React.Component {

	constructor() {
		super();
		this.state = {
			showComments: false,
			comments: [
				// {id: 1, author: 'Morgan McCircuit', body: 'Great picture'},
				// {id: 2, author: 'Bending Bender', body: 'Excellent stuff'}
			]
		};
	}

	_getComments() {
		// const commentList = [
		// 	{id: 1, author: 'Morgan McCircuit', body: 'Great picture'},
		// 	{id: 2, author: 'Bending Bender', body: 'Excellent stuff'}
		// ];
		return this.state.comments.map((comment) => {
			return ( <Comment 
				author={comment.author} body={comment.body} key={comment.id} onDelete={this._delteComment.bind(this)}
				/> );
		});
	}
	
	_getCommentsTitle(commentCount) {
		if(commentCount === 0){
			return 'No comment yet';
		}else if (commentCount === 1){
			return '1 comment';
		}else {
			return `${commentCount} Comments`;
		}
	}

	_handClick() {
		this.setState({
			showComments: !this.state.showComments
		});
	}

	_addComment(author, body) {
		const comment = {
			id: this.state.comments.length +1,
			author,
			body
		};
		this.setState({ comments: this.state.comments.concat([comment]) });
	}

	_fetchComments() {
		$.ajax({
			method: 'GET',
			url: 'api/comment.json',
			success: (comments) => {
				this.setState({Comments});
			}
		});
	}

	_delteComment(comment) {
		$.ajax({
			method: 'DELETE',
			url: `api/comments/${comment.id}`
		});

		const comments = [ this.state.comments ];
		const commentIndex = comments.indexOf(comment);
		comments.splice(commentIndex, 1);

		this.setState({ comments });
	}

	componentWillMount() {
		_fetchComments();
	}

	componentDidMount() {
		this._timer = setInterval( () => this._fetchComments(), 5000 );
	}

	componentWillUnMount() {
		clearInterval( this._timer );
	}

	render() {
		const comments = this._getComments();
		let commentNodes;
		if( this.state.showComments ){
			commentNodes = <div className="comment-list">{ comments }</div>		
		}
		let buttonText = 'Show comments';
		if(this.state.showComments) {
			buttonText = 'Hide comments';
		}
		return (
			<div className="comment-box">
				<h3>Comments</h3>
				<h4 className="comment-count">{ this._getCommentsTitle(comments.length) }</h4>
				{commentNodes}
				<div className="comment-list">
					{comments}
				</div>
				<button onClick={this._handClick.bind(this)}>{buttonText}</button>
				<CommentForm addComment={this._addComment.bind(this)} />
			</div>
		)
	}
}
ReactDOM.render(
	<CommentBox />, document.getElementById('comment')
);