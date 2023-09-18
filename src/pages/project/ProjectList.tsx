import { Box, Container, Heading, Text, Link } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Button, Card, CardHeader } from "@chakra-ui/react";
import { getProjects } from "../../services/project";
import { Project } from "../../types/project";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Link as Router } from "react-router-dom";

export const ProjectList = () => {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const onNewProjectClick = () => {
    navigate("/project/new");
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await getProjects();
      setProjectList(response);
    };
    fetch();
  }, []);

  return (
    <Container minW={"lg"} mt={5}>
      <Heading mb={3} size={"lg"}>
        Select Project
      </Heading>
      <Button my={3} onClick={onNewProjectClick}>
        <AddIcon />
        <Text pl={3}>New Project</Text>
      </Button>
      <Box my={3}>
        {projectList.map((project) => (
          <Card key={project.name} mb={3}>
            <CardHeader>
              <Link
                as={Router}
                to={`/${project.name}`}
                _hover={{ textDecoration: "none" }}
              >
                <Heading mb={3}>{project.name}</Heading>
              </Link>

              <Text my={3}>{project.description}</Text>
            </CardHeader>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
