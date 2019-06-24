import React from 'react';

export const SectionListDropdown = props => {
    const { sections, section, selectSection } = props;
    const sectionItems = Object.keys(sections).map( sectionId => {
        // only show checkmark next the actual section that this task belongs to
        const checkClass = section.id.toString() === sectionId.toString() ? "fa-check-visible" : "fa-check-transparent";
        return (
            <li key={sectionId} onClick={selectSection(sectionId)}>
                <i className={`fas fa-check ${checkClass}`}></i>
                <p>{sections[sectionId].name}</p>
            </li>
        );
    });
    return (
        <ul className="section-dropdown-menu-hidden" id="section-dropdown-menu">
            {sectionItems}
        </ul>
    );
};