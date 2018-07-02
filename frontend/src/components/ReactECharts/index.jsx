import React from 'react';
import echarts from 'echarts';
import 'echarts/theme/macarons';
import elementResizeEvent from 'element-resize-event';

class ReactEcharts extends React.Component {
    componentDidMount() {
        const echartObj = this.renderEchartDom();
        const onEvents = this.props.onEvents || {};
        let reizeEvent;

        this.bindEvents(echartObj, onEvents);

        if (typeof this.props.onChartReady === 'function') {
            this.props.onChartReady(echartObj);
        }

        function resize() {
            clearTimeout(reizeEvent);
            reizeEvent = setTimeout(() => {
                echartObj.resize();
            }, 200);
        }

        elementResizeEvent(this.echartsDom, () => {
            resize();
        });
    }

    componentDidUpdate() {
        this.renderEchartDom();
        this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
    }

    componentWillUnmount() {
        echarts.dispose(this.echartsDom);
    }

    getEchartsInstance() {
        const theme = this.props.theme ? this.props.theme : 'macarons';

        return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom, theme);
    }

    bindEvents(instance, events) {
        const loop = function loop(eventName) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
                // binding event
                instance.off(eventName);
                instance.on(eventName, (param) => {
                    events[eventName](param, instance);
                });
            }
        };

        for (const eventName in events) {
            loop(eventName);
        }

    }

    renderEchartDom() {
        const echartObj = this.getEchartsInstance();

        // Set the echart option
        echartObj.setOption(
            this.props.option,
            this.props.notMerge || false,
            this.props.lazyUpdate || false
        );

        // Set loading mask
        if (this.props.showLoading) {
            echartObj.showLoading(this.props.loadingOption || null);
        } else {
            echartObj.hideLoading();
        }

        return echartObj;
    }

    render() {
        const style = this.props.style || {
            height: '350px'
        };

        return (
            <div
                ref={(c) => {
                    this.echartsDom = c;
                }}
                className={this.props.className}
                style={style}
            />
        );
    }
}

export default ReactEcharts;
