import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {
      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons

        if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });

      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }

      $subUl.stop().slideToggle(slideTime);
    });

    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = history.location;

    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }

    highlightActive(currentLocation.pathname);
    history.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {
    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>
        <li className="nav-header"><span>Navigation</span></li>
        <li><FlatButton href="#/app/dashboard"><i className="nav-icon material-icons">dashboard</i><span className="nav-text">Dashboard</span></FlatButton></li>
        <li className="nav-divider" />
        <li><FlatButton href="#/app/camera"><i className="nav-icon material-icons">photo_camera</i><span className="nav-text">Camera</span></FlatButton></li>
        <li><FlatButton href="#/app/storage"><i className="nav-icon material-icons">storage</i><span className="nav-text">Storage</span></FlatButton></li>
        <li><FlatButton href="#/app/network"><i className="nav-icon material-icons">network_cell</i><span className="nav-text">Network</span></FlatButton></li>
        <li><FlatButton href="#/app/location"><i className="nav-icon material-icons">my_location</i><span className="nav-text">Location</span></FlatButton></li>
        <li><FlatButton href="#/app/applications"><i className="nav-icon material-icons">settings_applications</i><span className="nav-text">Advanced</span></FlatButton></li>
        <li className="nav-divider" />
      </ul>
    );
  }
}

module.exports = withRouter(SidebarContent);
