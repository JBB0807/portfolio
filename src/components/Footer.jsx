import Profile from "../assets/profile.json";

//get data from profile.json
const name = Profile.name;

const Footer = () => {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} {name}.
      </small>
    </footer>
  );
};

export default Footer;