import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavigationExampleSimple extends Component {
  state = {
    selectedIndex: 0,
  };

  select = index => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Recents"
            icon={recentsIcon}
            onClick={() => this.select(0)}
                    />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon}
            onClick={() => this.select(1)}
                    />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
                    />
        </BottomNavigation>
      </Paper>
    );
  }
}

const BottomNavigationSection = () => (
  <article className="article">
    <h2 className="article-title">Material Bottom Navigation</h2>

    <section className="box box-transparent">
      <div className="box-body padding-xl no-padding-h">
        <BottomNavigationExampleSimple />
        <div className="callout callout-info no-margin-bottom">
          <p>The selected BottomNavigationItem is determined by application state (for instance, by the URL).</p>
        </div>
      </div>
    </section>
  </article>
    );

export default BottomNavigationSection;
