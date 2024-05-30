import { GeneralLayout } from "../../components/shared/layout";
import ContactSection from "./components/contact/Contact.Section";
import ExperienceSection from "./components/experience/Experience.Section";
import MeSection from "./components/me/Me.Section";
import WelcomeSection from './components/welcome/Welcome.Section';

const HomePage = () => {

  return (
    <>
      <GeneralLayout>
        <WelcomeSection />
        <MeSection />
        <ExperienceSection />
        <ContactSection />
      </GeneralLayout>
    </>
  );
};

export default HomePage;