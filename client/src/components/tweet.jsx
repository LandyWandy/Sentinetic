import '../css/style.css';
import pfp from '../images/BlankPFP.jpeg';

function Tweet({ tweet }) {
    if (!tweet) {
        return <div></div>; // replace this with a loading spinner or any loading UI
    }
   return (
    <div className='tweet'>
        <Avatar />
        <div className='content'>
            <NameWithHandle /><Time createdAt={tweet.createdAt}/>
            <Message text={tweet.text}/>
            <div className='buttons'>
                <div className="button">
                    <CommentButton comments={tweet.comments}/> 
                </div>
                <div className="button">
                    <LikeButton likes={tweet.likes}/>
                </div>
                <div className="button">
                    <RetweetButton retweets={tweet.retweets}/>
                </div>
                <div className="button">
                    <ShareButton />
                </div>
                
            </div>
        </div>
    </div>
   )
}

function Avatar() {
    return(
        <img
        src={pfp}
        className='avatar'
        alt='avatar'
        />
    )
}

function Message({ text }) {
    return(
        <div className='message'>
            {text}
        </div>
    )
}

function NameWithHandle() {
    return(
        <span className='name-with-handle'>
        <span className='name'>User</span>
        <span className='name'>@username</span>
        </span>
    )
}

function Time({ createdAt }) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // default formatting
    return <span className='time'>{formattedDate}</span>;
}

const LikeButton = ({ likes }) => (
    <span>
        <i className='fa fa-heart like-button'/> {likes} 
    </span>
);
const CommentButton = ({ comments }) => (
    <span>
        <i className='far fa-comment'/> {comments}
    </span>
);
const RetweetButton = ({ retweets }) => (
    <span>
        <i className='fa fa-retweet retweet-button'/> {retweets} 
    </span>
);
const ShareButton = () => (
    <i className='fas fa-external-link-alt'/>
);

export default Tweet;
