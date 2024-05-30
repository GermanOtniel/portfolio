import { Sidenav, Nav } from 'rsuite';
import SiteIcon from '@rsuite/icons/Site';
import MemberIcon from '@rsuite/icons/Member';
import CodeIcon from '@rsuite/icons/Code';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import MessageIcon from '@rsuite/icons/Message';
import { useState } from 'react';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import { useLayoutContext } from '../../../context/layoutContext/Layout.Context';

const SidebarShared = () => {
  const { onChangeTheme, theme, } = useThemeContext();
  const { layoutConfig, onChangeLayout, } = useLayoutContext();
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div 
      style={{ width: "fit-content", height: "100%", maxHeight: "100%", position: "fixed", zIndex: 7 }}
    >
      <Sidenav 
        expanded={layoutConfig.isExpandedSidebar} 
        style={{ height: "100%", maxHeight: "100%" }}
      >
        <Sidenav.Header style={{ marginBottom: "auto", padding: "10px 5px", textAlign: "center", backgroundColor: theme === "dark" ? "black" : "transparent" }}>
          <img
            src='/images/port-o1.png'
            alt='Portfolio logo'
            style={{
              width: "40px",
            }}
            onClick={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
          />
          <p style={{ fontWeight: "600", color: theme === "dark" ? "white" : "inherit" }}>Otniel</p>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<SiteIcon />} href='/#welcome'>
              Welcome
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<MemberIcon />} href='/#about-me'>
              About me
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<CodeIcon />} href='/#experience'>
              Experience
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<MessageIcon />} href='/#contact'>
              Contact
            </Nav.Item>
            <Nav.Menu 
              placement="rightStart" 
              eventKey="4" 
              title="Features" 
              icon={<MagicIcon />}
            >
              <Nav.Item eventKey="3-1" href='/users'>User registration</Nav.Item>
              <Nav.Item eventKey="3-2" href='/ocr'>OCR</Nav.Item>
              <Nav.Item eventKey="3-3" href='/pwa'>PWA</Nav.Item>
              <Nav.Item eventKey="3-4" href='/excels'>Excel reading</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle 
          onToggle={expanded => onChangeLayout({ ...layoutConfig, isExpandedSidebar: expanded })} 
        />
      </Sidenav>
    </div>
  );
};

export default SidebarShared;