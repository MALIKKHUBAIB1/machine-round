import { lazy, Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
// import Accordian from "./Accordian";
// import FetchQuery from "./Component/FetchQuery";
// import LocalStorage from "./Component/Storage/LocalStorage";
// import Todo from "./Component/Storage/Todo";
// import Cookies from "./Component/Storage/Cookies";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./utils/store/usercontext";
// import TrafficLight from "./Component/TrafficLight";
import ProgrressBar from "./Component/ProgrressBar";
import TicTac from "./Component/Storage/TicTac";
import Page from "./Component/Page";
import AutoComplete from "./Component/AutoComplete";
import CachedContextProvider from "./utils/CacheContext.jsx";
import Chat from "./Component/livechat/Chat.jsx";
import { store } from "./utils/store/store.js";
import Form from "./Component/Form/Form.jsx";
const TrafficLight = lazy(() => import("./Component/TrafficLight"));

// import Login from "./Login";
// import Root from "./Root";
// import Error from "./Component/Error";
// import ImageSlider from "./Component/ImageSlider";
// import Pagination from "./Component/Storage/Pagination";
const ImageSlider = lazy(() => import("./Component/ImageSlider"));
const Pagination = lazy(() => import("./Component/Storage/Pagination"));

const Login = lazy(() => import("./Login"));
const Root = lazy(() => import("./Root"));
const Todo = lazy(() => import("./Component/Storage/Todo"));
const Error = lazy(() => import("././Component/Error"));
const Cookies = lazy(() => import("./Component/Storage/Cookies"));
const LocalStorage = lazy(() => import("./Component/Storage/LocalStorage"));
const FetchQuery = lazy(() => import("./Component/FetchQuery"));
function App() {
  // const [index, setIndex] = useState(0);
  // const [prevIndex, setPrevIndex] = useState(index);
  // const accordionData = [
  // {
  //   id: 1,
  //   title: "What is Vite?",
  //   content:
  //     "Vite is a modern frontend build tool that provides an extremely fast development environment and optimized build for production.",
  // },
  // {
  //   id: 2,
  //   title: "Why use Vite?",
  //   content:
  //     "Vite leverages native ES modules in the browser and provides lightning-fast hot module replacement, making it much faster compared to traditional bundlers like Webpack.",
  // },
  // {
  //   id: 3,
  //   title: "How does Vite work?",
  //   content:
  //     "During development, Vite serves source code over native ES modules. For production, Vite bundles your code using Rollup.",
  // },
  // {
  //   id: 4,
  //   title: "What are Vite's key features?",
  //   content:
  //     "Key features include fast development server, optimized builds, out-of-the-box support for JavaScript, TypeScript, JSX, CSS, and more.",
  // },
  // {
  //   id: 5,
  //   title: "How to install Vite?",
  //   content:
  //     "To install Vite, run `npm create vite@latest` and follow the prompts to set up your project.",
  // },
  // ];
  // function handleSHowAccordian(currentIndex) {
  // if (prevIndex === currentIndex) {
  //   setIndex(0); // Close the accordion if the same one is clicked
  // } else {
  //   setIndex(currentIndex); // Open the clicked accordion
  // }

  // setPrevIndex(currentIndex);
  // setIndex(currentIndex === index ? 0 : currentIndex);
  // }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Todo /> },
        { path: "localstorage", element: <LocalStorage /> },
        { path: "cookie", element: <Cookies /> },
        { path: "todo", element: <FetchQuery /> },
        { path: "slider", element: <ImageSlider /> },
        { path: "progress", element: <ProgrressBar /> },
        { path: "trafic", element: <TrafficLight /> },
        { path: "tictac", element: <TicTac /> },
        { path: "pagination", element: <Page /> },
        { path: "acomplete", element: <AutoComplete /> },
        { path: "chat", element: <Chat /> },
        { path: "form", element: <Form /> },

        {
          path: "page",
          element: (
            <Suspense fallback={"loading"}>
              <Pagination />
            </Suspense>
          ),
        },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
  return (
    <Provider store={store}>
      <CachedContextProvider>
        <AuthProvider>
          <RouterProvider router={router}>
            {/* <div className="w-[100%]"> */}
            {/* {accordionData.map((item) => {
        return (
          <Accordian
            key={item.id}
            data={item}
            show={index === item.id}
            index={item.id}
            handleSHowAccordian={handleSHowAccordian}
          />
        );
      })} */}
            {/* </div> */}
          </RouterProvider>
        </AuthProvider>
      </CachedContextProvider>
    </Provider>
  );
}

export default App;
