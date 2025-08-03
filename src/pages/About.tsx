import { Link } from 'react-router';

const About = () => {
  return (
    <div className="flex h-full w-full flex-col dark:text-gray-400">
      <ul>
        <li>
          <b className="mr-2">Author:</b>
          <Link className="text-blue-500" to="https://github.com/AlanNRZBV">
            Alan
          </Link>
        </li>
        <li>
          <b className="mr-2">React course:</b>
          <Link
            className="text-blue-500"
            to="https://github.com/rolling-scopes-school/tasks/tree/master/react"
          >
            Github
          </Link>
        </li>
        <li>
          <b className="mr-2">React course:</b>
          <Link
            className="text-blue-500"
            to="https://rs.school/courses/reactjs"
          >
            Rs.school
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default About;
