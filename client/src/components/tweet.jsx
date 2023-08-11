import '../css/style.css';
import pfp from '../images/BlankPFP.jpeg';

// Main Tweet component that receives a single tweet as a prop.
function Tweet({ tweet }) {
    // If there's no tweet data provided, display a loading state.
    if (!tweet) {
        return <div></div>; // You can replace this with a loading spinner or another appropriate UI element.
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

// Component for displaying the user's avatar.
function Avatar() {
    return(
        <img
        src={pfp}
        className='avatar'
        alt='avatar'
        />
    )
}

// Component to display the tweet's main content/message.
function Message({ text }) {
    return(
        <div className='message'>
            {text}
        </div>
    )
}

// Component to display a hardcoded user name and handle.
function NameWithHandle() {
    return(
        <span className='name-with-handle'>
        <span className='name'>User</span>
        <span className='name'>@username</span>
        </span>
    )
}

// Component to display the time when the tweet was created.
function Time({ createdAt }) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // Default formatting. This can be customized as needed.
    return <span className='time'>{formattedDate}</span>;
}

// These components represent the different action buttons found on a tweet.
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
