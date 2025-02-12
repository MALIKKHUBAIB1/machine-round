import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, removeChat } from "../../utils/store/ChatSLice";

const liveMessage = [
  { message: "Hello everyone!", user: "john_doe" },
  {
    message: "You light up my world like nobody else! ✨",
    user: "romantic_soul",
  },
  {
    message: "Why did the chicken cross the road? To get to the other side!",
    user: "funny_man",
  },
  { message: "You are loved, valued, and appreciated. ❤️", user: "kind_heart" },
  { message: "I love coding! ❤️", user: "tech_nerd" },
  {
    message: "Love is the bridge between you and everything. 💕",
    user: "deep_thinker",
  },
  {
    message:
      "Knock knock. Who’s there? Boo. Boo who? Don’t cry, it’s just a joke!",
    user: "jokester99",
  },
  {
    message: "Every day is a new chance to spread kindness! 😊",
    user: "positive_vibes",
  },
  { message: "LMAO, that was hilarious!", user: "laughing_guy" },
  {
    message: "You're the reason someone smiles today! 😍",
    user: "smiley_face",
  },
  {
    message:
      "Love is not about how many days, months, or years you’ve been together. It’s about how much you love each other every single day! ❤️",
    user: "true_lover",
  },
  {
    message: "Happiness is doubled when shared with someone special. 💞",
    user: "happiness_giver",
  },
  { message: "You are a blessing to this world! 🌎✨", user: "blessed_one" },
  {
    message: "Love deeply, laugh often, and live fully! 💖",
    user: "life_lover",
  },
  {
    message: "Your kindness makes the world a better place! 💜",
    user: "kind_soul",
  },
  {
    message:
      "The best feeling is when you look at someone and they are already looking at you! 💕",
    user: "romantic_heart",
  },
  {
    message: "Hold my hand, and I promise to keep you safe forever. 🤝❤️",
    user: "forever_yours",
  },
  {
    message: "If love was a storybook, we’d meet on the very first page. 📖💖",
    user: "storyteller",
  },
  {
    message: "You make my world brighter just by being in it! 🌞💛",
    user: "sunshine",
  },
  {
    message: "Love is not just something you say, it’s something you do. 💑",
    user: "love_in_action",
  },
];

function Chat() {
  const [chat, setMessage] = useState("");
  const storedMessage = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  function sendMessage() {
    if (chat.trim() === "") return; // Prevent empty messages
    dispatch(addChat({ message: chat, user: "Khubaib Malik" }));
    setMessage("");
  }

  function sendDummyData(mes, user) {
    dispatch(addChat({ message: mes, user }));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * liveMessage.length);
      const { message, user } = liveMessage[randomIndex];
      sendDummyData(message, user);
      dispatch(removeChat());
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [storedMessage]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-lg border border-gray-300 h-[800px] flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Live Chat
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 flex flex-col gap-3"
      >
        {storedMessage.map((chat, i) => (
          <div
            key={i}
            className={`p-3 max-w-[75%] rounded-lg text-lg ${
              chat.user === "Khubaib Malik"
                ? "bg-blue-500 text-white self-end"
                : "bg-white text-gray-900 self-start border border-gray-300"
            }`}
          >
            <span className="font-bold">{chat.user}</span>: {chat.message}
          </div>
        ))}
      </div>

      {/* Input Box (Fixed at Bottom) */}
      <div className="flex items-center border-t border-gray-300 p-3 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none"
          value={chat}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
        />
        <button
          className="ml-3 px-5 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
