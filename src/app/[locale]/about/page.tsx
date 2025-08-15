const Page = () => {
  return (
    <div className="flex h-full w-full flex-col dark:text-gray-400">
      <ul>
        <li>
          <b className="mr-2">Author:</b>
          <a className="text-blue-500" href="https://github.com/AlanNRZBV">
            Alan
          </a>
        </li>
        <li>
          <b className="mr-2">React course:</b>
          <a
            className="text-blue-500"
            href="https://github.com/rolling-scopes-school/tasks/tree/master/react"
          >
            Github
          </a>
        </li>
        <li>
          <b className="mr-2">React course:</b>
          <a className="text-blue-500" href="https://rs.school/courses/reactjs">
            Rs.school
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Page;
