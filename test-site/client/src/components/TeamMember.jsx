/* eslint-disable react/prop-types */
import React from 'react';
import Linkedin from '../images/icons/QUELL-icons-linkedin.svg';
import Github from '../images/icons/QUELL-icons-github.svg';

/*
  Reusable component to generate each team member
*/

const TeamMember = (props) => {
  const {
    src, bio, name, linkedin, github,
  } = props;

  return (
    <div className="profile-pics">
      <img src={src} alt="Quell Team" />
      <p className="team-member-name">{name}</p>
      <p>{bio}</p>
      <div className="social-icons">
        <a href={linkedin} target="_blank" rel="noreferrer">
          <img src={Linkedin} alt="linkedin button" />
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          <img src={Github} alt="github button" />
        </a>
      </div>
    </div>
  );
};

export default TeamMember;
