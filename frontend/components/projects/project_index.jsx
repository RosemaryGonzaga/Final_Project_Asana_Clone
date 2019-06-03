import React from 'react';
import { ProjectIndexItem } from './project_index_item';
import ProjectShowContainer from './project_show_container';
import { Route } from 'react-router-dom';

class ProjectIndex extends React.Component {
    componentDidMount() {
        const { fetchProjects } = this.props;
        fetchProjects();
    }

    render() {
        const { projects } = this.props;
        const projectItems = projects.map( project => { 
            return <ProjectIndexItem project={project} key={project.id} />;
            // return (
            //     <div key={project.id}>
            //         <ProjectIndexItem project={project} key={project.id} />
            //         <Route exact path={`/projects/${project.id}`} component={ProjectShowContainer} />
            //         <Route exact path={`/projects/:${project.id}`} component={ProjectShowContainer} />
            //     </div>     
            // );
        });

        return (
            <div className="project-index-container">
                {/* <Route path="/projects/:projectId" component={ProjectShowContainer}/> */}
                {/* <Route path={`/projects/:${project.id}`} component={ProjectShowContainer} /> */}
                {/* <Route path="/projects/:17" component={ProjectShowContainer} /> */}
                <ul>{projectItems}</ul>
                {/* <ProjectShowContainer /> */}
            </div>
        );
    }
}

export default ProjectIndex;