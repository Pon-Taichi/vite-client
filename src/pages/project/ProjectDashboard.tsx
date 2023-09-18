import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../services/project";
import { Project } from "../../types/project";

export const ProjectDashboard = () => {
  const { project } = useParams();

  const [projectData, setProjectData] = useState<Project>();

  useEffect(() => {
    const data = async () => {
      const response = await getProject(project);
      setProjectData(response);
    };
    data();
  }, [project]);

  return (
    <>
      <Heading>{projectData?.name}</Heading>
      <Text>{projectData?.description}</Text>
    </>
  );
};
