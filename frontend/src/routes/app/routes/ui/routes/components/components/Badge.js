import React from 'react';
import Badge from 'material-ui/Badge';

const BadgeSection = () => (
  <article className="article">
    <h2 className="article-title">Material Badges</h2>
    <div className="row">
      <div className="col-xl-6">
        <div className="box box-default">
          <div className="box-header">Number and Icon</div>
          <div className="box-body text-center padding-lg">

            <div className="material-icons mdl-badge mdl-badge--overlap" data-badge="1">account_box</div>
            <div className="space space-md" />
            <div className="material-icons mdl-badge mdl-badge--overlap" data-badge="♥">account_box</div>

          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="box box-default">
          <div className="box-header">Number and Icon</div>
          <div className="box-body text-center padding-lg">

            <span className="mdl-badge" data-badge="4">Inbox</span>
            <div className="space space-md" />
            <span className="mdl-badge" data-badge="♥">Mood</span>

          </div>
        </div>
      </div>
    </div>
  </article>
);

module.exports = BadgeSection;
