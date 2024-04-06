import PageUi from './PageUi';
import data from './Utils';
import StateService from './StateService';
import PageController from './PageController';

const pageUi = new PageUi(data);
pageUi.bindToDOM(document.querySelector('.page'));

const stateService = new StateService(localStorage);
const pageCtrl = new PageController(pageUi, stateService);

pageCtrl.init();
