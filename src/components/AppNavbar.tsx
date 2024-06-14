import { FC, ReactNode } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface AppNavbarProps {
  className?: string;
  children?: ReactNode;
}

const AppNavbar: FC<AppNavbarProps> = ({ className, children }) => {
  return (
    <Card className={className}>
      <Card.Header>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/movies">
              Movies
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="/sandbox">
              Sandbox
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default AppNavbar;
