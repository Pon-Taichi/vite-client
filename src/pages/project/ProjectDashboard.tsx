import { Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Project } from "../../types/project";

export const ProjectDashboard = () => {
  const projectData = useLoaderData() as Project;

  return (
    <>
      <Heading>{projectData.name}</Heading>
      <Text>{projectData.description}</Text>
    </>
  );
};
