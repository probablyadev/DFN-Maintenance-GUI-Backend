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
        <li>
          <FlatButton href="#/app/ui"><i className="nav-icon material-icons">folder_open</i><span className="nav-text">UI Kit</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/ui/buttons"><span>Buttons</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/cards"><span>Cards</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/boxes"><span>Boxes</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/icons"><span>Icons</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/icon-boxes"><span>Icon Boxes</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/lists"><span>Lists</span><span className="badge badge-pill badge-success">9</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/pricing-tables"><span>Pricing Tables</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/timeline"><span>Timeline</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/feature-callouts"><span>Feature Callouts</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/components"><span>Components</span><span className="badge badge-pill badge-danger">11</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/menus"><span>Menus</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/hover"><span>Hover</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/sashes"><span>Sashes</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/testimonials"><span>Testimonials</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/call-to-actions"><span>Call to Actions</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/typography"><span>Typography</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/grids"><span>Grids</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ui/colors"><span>Colors</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/form"><i className="nav-icon material-icons">mode_edit</i><span className="nav-text">Forms</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/form/components"><span>Form Components</span><span className="badge badge-pill badge-info">12</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/form/steppers"><span>Steppers</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/form/layouts"><span>Form Layouts</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/table"><i className="nav-icon material-icons">list</i><span className="nav-text">Tables</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/table/static"><span>Static Tables</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/table/responsive"><span>Responsive Tables</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/table/data"><span>Data Tables</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/chart"><i className="nav-icon material-icons">pie_chart_outlined</i><span className="nav-text">Charts</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/chart/line"><span>Line & Area</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/bar"><span>Bar</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/pie"><span>Pie</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/scatter"><span>Scatter</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/radar"><span>Radar</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/funnel"><span>Funnel</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/chart/more"><span>More</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/page"><i className="nav-icon material-icons">content_copy</i><span className="nav-text">Pages</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/page/about"><span>About</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/services"><span>Services</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/careers"><span>Careers</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/contact"><span>Contact</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/faqs"><span>FAQs</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/blog"><span>Blog</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/page/terms"><span>Terms of Services</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/ecommerce"><i className="nav-icon material-icons">shopping_cart</i><span className="nav-text">eCommerce</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/ecommerce/products"><span>Products</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ecommerce/horizontal-products"><span>Products (Honrizonal)</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/ecommerce/invoice"><span>Invoice</span></FlatButton></li>
          </ul>
        </li>
        <li className="nav-divider" />
        <li><FlatButton href="#/app/extra"><i className="nav-icon material-icons">more_horiz</i><span className="nav-text">Extra Pages</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/login"><span>Login</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/sign-up"><span>Sign Up</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/forgot-password"><span>Forgot Password</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/confirm-email"><span>Confirm Email</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/lock-screen"><span>Lock Screen</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/404"><span>404 Error</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/500"><span>500 Error</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/pglayout"><i className="nav-icon material-icons">desktop_windows</i><span className="nav-text">Page Layouts</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="#/app/pglayout/full-width"><span>Full Width</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/app/pglayout/centered"><span>Centered</span></FlatButton></li>
            <li><FlatButton className="prepend-icon" href="#/fullscreen"><span>Fullscreen</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/menu"><i className="nav-icon material-icons">sort</i><span className="nav-text">Menu Levels</span></FlatButton>
          <ul>
            <li><FlatButton className="prepend-icon" href="javascript:;"><span>Level 1</span></FlatButton></li>
            <li>
              <FlatButton className="prepend-icon" href="javascript:;"><span>Level 1</span></FlatButton>
              <ul>
                <li><FlatButton href="javascript:;"><span>Level 2</span></FlatButton></li>
                <li>
                  <FlatButton href="javascript:;"><span>Level 2</span></FlatButton>
                  <ul>
                    <li><FlatButton href="javascript:;"><span>Level 3</span></FlatButton></li>
                    <li><FlatButton href="javascript:;"><span>Level 3</span></FlatButton></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="nav-divider" />
        <li className="nav-header"><span>Material Design</span></li>
        <li className="li-small"><FlatButton href="#/app/form/components"><i className="nav-icon nav-dot material-icons color-success">fiber_manual_record</i><span className="nav-text">Form Components</span></FlatButton></li>
        <li className="li-small"><FlatButton href="#/app/ui/components"><i className="nav-icon nav-dot material-icons color-info">fiber_manual_record</i><span className="nav-text">UI Components</span></FlatButton></li>
      </ul>
    );
  }
}

module.exports = withRouter(SidebarContent);
