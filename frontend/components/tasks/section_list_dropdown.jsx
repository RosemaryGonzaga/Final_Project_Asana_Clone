import React from 'react';

export const SectionListDropdown = props => {
    const { sections } = props;
    // const { sections, selectSection } = props;
    const sectionItems = sections.map( section => {
        <li>{section.name}</li>
    });
    return (
        <ul className="section-dropdown-menu">
            {sectionItems}
        </ul>
    );
};