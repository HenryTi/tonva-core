var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import _ from 'lodash';
import { Controller, resLang } from '../../components';
import { PureJSONContent } from '../tools';
import { UqMan } from '../../uq';
import { CLink } from '../link';
import { CBook } from '../book';
import { CSheet } from '../sheet';
import { CAction } from '../action';
import { CQuery, CQuerySelect } from '../query';
import { CTuidMain, CTuidInfo, CTuidSelect, CTuidEdit, CTuidList } from '../tuid';
import { CMap } from '../map';
import { VUq } from './vUq';
import { CHistory } from '../history';
import { CPending } from '../pending';
import { TuidWithUIRes, ReactBoxId } from './reactBoxId';
function lowerPropertyName(entities) {
    if (entities === undefined)
        return;
    for (let i in entities)
        entities[i.toLowerCase()] = entities[i];
}
export class CUq extends Controller /* implements Uq*/ {
    //constructor(cApp:CApp, uq:string, appId:number, uqId:number, access:string, ui:UqUI) {
    constructor(cApp, uqData, ui) {
        super(resLang(ui.res));
        this.tuidURs = {};
        this.createBoxId = (tuid, id) => {
            let { name } = tuid;
            let tuidUR = this.tuidURs[name];
            if (tuidUR === undefined) {
                let { ui, res } = this.getUI(tuid);
                this.tuidURs[name] = tuidUR = new TuidWithUIRes(tuid, ui, res);
            }
            return new ReactBoxId(tuidUR, id);
        };
        this.isSysVisible = false;
        this.cApp = cApp;
        //this.id = uqId;
        // 每一个ui都转换成小写的key的版本
        lowerPropertyName(ui.tuid);
        lowerPropertyName(ui.sheet);
        lowerPropertyName(ui.map);
        lowerPropertyName(ui.query);
        lowerPropertyName(ui.action);
        lowerPropertyName(ui.book);
        lowerPropertyName(ui.history);
        lowerPropertyName(ui.pending);
        this.ui = ui;
        this.CTuidMain = ui.CTuidMain || CTuidMain;
        this.CTuidEdit = ui.CTuidEdit || CTuidEdit;
        this.CTuidList = ui.CTuidList || CTuidList;
        this.CTuidSelect = ui.CTuidSelect || CTuidSelect;
        this.CTuidInfo = ui.CTuidInfo || CTuidInfo;
        this.CQuery = ui.CQuery || CQuery;
        this.CQuerySelect = ui.CQuerySelect || CQuerySelect;
        this.CMap = ui.CMap || CMap;
        this.CAction = ui.CAction || CAction;
        this.CSheet = ui.CSheet || CSheet;
        this.CBook = ui.CBook || CBook;
        this.CHistory = ui.CHistory || CHistory;
        this.CPending = ui.CPending || CPending;
        this.uq = new UqMan(cApp.uqs, uqData, this.createBoxId, undefined);
    }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uq.init();
        });
    }
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.uq.loadEntities();
            }
            catch (err) {
                return err;
            }
        });
    }
    getQuerySearch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.uq.query(name);
            if (query === undefined)
                alert(`QUERY ${name} 没有定义!`);
            else {
                yield query.loadSchema();
                let { returns } = query;
                if (returns.length > 1) {
                    alert(`QUERY ${name} 返回多张表, 无法做QuerySearch`);
                }
            }
            return query;
        });
    }
    getTuidPlaceHolder(tuid) {
        let { tuidPlaceHolder, entity } = this.res;
        let { name } = tuid;
        //let type:string;
        if (entity !== undefined) {
            let en = entity[name];
            if (en !== undefined) {
                //type = en.label;
            }
        }
        return (tuidPlaceHolder || 'Select');
    }
    getNone() {
        let { none } = this.res;
        return none || 'none';
    }
    isVisible(entity) {
        return entity.sys !== true || this.isSysVisible;
    }
    navSheet(sheetTypeId, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sheet = this.uq.sheetFromTypeId(sheetTypeId);
            if (sheet === undefined) {
                alert('sheetTypeId ' + sheetTypeId + ' is not exists!');
                return;
            }
            let cSheet = this.cSheet(sheet);
            yield cSheet.startSheet(sheetId);
        });
    }
    sheet(entityName) { return this.uq.sheet(entityName); }
    action(entityName) { return this.uq.action(entityName); }
    query(entityName) { return this.uq.query(entityName); }
    book(entityName) { return this.uq.book(entityName); }
    map(entityName) { return this.uq.map(entityName); }
    history(entityName) { return this.uq.history(entityName); }
    pending(entityName) { return this.uq.pending(entityName); }
    tuid(entityName) { return this.uq.tuid(entityName); }
    tuidDiv(entityName, divName) {
        return this.uq.tuidDiv(entityName, divName);
    }
    cSheetFromName(entityName) {
        let entity = this.uq.sheet(entityName);
        if (entity !== undefined)
            return this.cSheet(entity);
    }
    cActionFromName(entityName) {
        let entity = this.uq.action(entityName);
        if (entity !== undefined)
            return this.cAction(entity);
    }
    cQueryFromName(entityName) {
        let entity = this.uq.query(entityName);
        if (entity !== undefined)
            return this.cQuery(entity);
    }
    cBookFromName(entityName) {
        let entity = this.uq.book(entityName);
        if (entity !== undefined)
            return this.cBook(entity);
    }
    cMapFromName(entityName) {
        let entity = this.uq.map(entityName);
        if (entity !== undefined)
            return this.cMap(entity);
    }
    cHistoryFromName(entityName) {
        let entity = this.uq.history(entityName);
        if (entity !== undefined)
            return this.cHistory(entity);
    }
    cPendingFromName(entityName) {
        let entity = this.uq.pending(entityName);
        if (entity !== undefined)
            return this.cPending(entity);
    }
    cTuidMainFromName(entityName) {
        let entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidMain(entity);
    }
    cTuidEditFromName(entityName) {
        let entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidEdit(entity);
    }
    cTuidInfoFromName(entityName) {
        let entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidInfo(entity);
    }
    cTuidSelectFromName(entityName) {
        let entity = this.uq.tuid(entityName);
        if (entity !== undefined)
            return this.cTuidSelect(entity);
    }
    cFromName(entityType, entityName) {
        switch (entityType) {
            case 'sheet':
                let sheet = this.uq.sheet(entityName);
                if (sheet === undefined)
                    return;
                return this.cSheet(sheet);
            case 'action':
                let action = this.uq.action(entityName);
                if (action === undefined)
                    return;
                return this.cAction(action);
            case 'tuid':
                let tuid = this.uq.tuid(entityName);
                if (tuid === undefined)
                    return;
                return this.cTuidMain(tuid);
            case 'query':
                let query = this.uq.query(entityName);
                if (query === undefined)
                    return;
                return this.cQuery(query);
            case 'book':
                let book = this.uq.book(entityName);
                if (book === undefined)
                    return;
                return this.cBook(book);
            case 'map':
                let map = this.uq.map(entityName);
                if (map === undefined)
                    return;
                return this.cMap(map);
            case 'history':
                let history = this.uq.history(entityName);
                if (history === undefined)
                    return;
                return this.cHistory(history);
            case 'pending':
                let pending = this.uq.pending(entityName);
                if (pending === undefined)
                    return;
                return this.cPending(pending);
        }
    }
    linkFromName(entityType, entityName) {
        return this.link(this.cFromName(entityType, entityName));
    }
    getUI(t) {
        let ui, res;
        let { name, typeName } = t;
        if (this.ui !== undefined) {
            if (typeName === 'div') {
                let tuidDiv = t;
                let ownerTuid = tuidDiv.owner;
                let tUIs = this.ui[ownerTuid.typeName];
                if (tUIs) {
                    let tUI = tUIs[ownerTuid.name];
                    if (tUI) {
                        let divs = tUI.divs;
                        if (divs) {
                            ui = divs[name];
                        }
                    }
                }
            }
            else {
                let tUI = this.ui[typeName];
                if (tUI !== undefined) {
                    ui = tUI[name];
                }
            }
        }
        let { entity } = this.res;
        if (entity !== undefined) {
            res = entity[name];
        }
        return { ui: ui || {}, res: res || {} };
    }
    link(cEntity) {
        return new CLink(cEntity);
    }
    get tuidLinks() {
        return this.uq.tuidArr.filter(v => this.isVisible(v)).map(v => this.link(this.cTuidMain(v)));
    }
    cTuidMain(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new ((ui && ui.CTuidMain) || this.CTuidMain)(this, tuid, ui, res);
    }
    cTuidEdit(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new ((ui && ui.CTuidEdit) || this.CTuidEdit)(this, tuid, ui, res);
    }
    cTuidList(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new ((ui && ui.CTuidList) || this.CTuidList)(this, tuid, ui, res);
    }
    cTuidSelect(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new ((ui && ui.CTuidSelect) || this.CTuidSelect)(this, tuid, ui, res);
    }
    cTuidInfo(tuid) {
        let { ui, res } = this.getUI(tuid);
        return new ((ui && ui.CTuidInfo) || this.CTuidInfo)(this, tuid, ui, res);
    }
    cSheet(sheet /*, sheetUI?:SheetUI, sheetRes?:any*/) {
        let { ui, res } = this.getUI(sheet);
        //if (sheetUI !== undefined) ui = sheetUI;
        //if (sheetRes !== undefined) res = sheetRes;
        //return new (ui && ui.CSheet || this.CSheet)(this, sheet, sheetUI, sheetRes);
        return new ((ui && ui.CSheet) || this.CSheet)(this, sheet, ui, res);
    }
    get sheetLinks() {
        return this.uq.sheetArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cSheet(v));
        });
    }
    cAction(action) {
        let { ui, res } = this.getUI(action);
        return new ((ui && ui.CAction) || this.CAction)(this, action, ui, res);
    }
    get actionLinks() {
        return this.uq.actionArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cAction(v));
        });
    }
    cQuery(query) {
        let { ui, res } = this.getUI(query);
        return new ((ui && ui.CQuery) || this.CQuery)(this, query, ui, res);
    }
    cQuerySelect(queryName) {
        let query = this.uq.query(queryName);
        if (query === undefined)
            return;
        let { ui, res } = this.getUI(query);
        return new ((ui && ui.CQuerySelect) || this.CQuerySelect)(this, query, ui, res);
    }
    get queryLinks() {
        return this.uq.queryArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cQuery(v));
        });
    }
    cBook(book) {
        let { ui, res } = this.getUI(book);
        return new ((ui && ui.CBook) || this.CBook)(this, book, ui, res);
    }
    get bookLinks() {
        return this.uq.bookArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cBook(v));
        });
    }
    cHistory(history) {
        let { ui, res } = this.getUI(history);
        return new ((ui && ui.CHistory) || this.CHistory)(this, history, ui, res);
    }
    get historyLinks() {
        return this.uq.historyArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cHistory(v));
        });
    }
    cPending(pending) {
        let { ui, res } = this.getUI(pending);
        return new ((ui && ui.CPending) || this.CPending)(this, pending, ui, res);
    }
    get pendingLinks() {
        return this.uq.pendingArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cPending(v));
        });
    }
    cMap(map) {
        let { ui, res } = this.getUI(map);
        return new ((ui && ui.CMap) || this.CMap)(this, map, ui, res);
    }
    get mapLinks() {
        return this.uq.mapArr.filter(v => this.isVisible(v)).map(v => {
            return this.link(this.cMap(v));
        });
    }
    getTuidContent(tuid) {
        let { ui } = this.getUI(tuid);
        return (ui && ui.content) || PureJSONContent;
    }
    getTuidDivContent(tuidDiv) {
        let { owner } = tuidDiv;
        let { ui } = this.getUI(owner);
        return (ui && ui.divs && ui.divs[tuidDiv.name].content) || PureJSONContent;
    }
    showTuid(tuid, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let c = this.cTuidInfo(tuid);
            yield c.start(id);
        });
    }
    showTuidDiv(tuid, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let { owner } = tuid;
            let c = this.cTuidInfo(owner);
            yield c.start(id);
        });
    }
    get VUq() { return VUq; }
    render() {
        let v = new (this.VUq)(this);
        return v.render();
    }
}
//# sourceMappingURL=cUq.js.map