/*
	Based on the offical js file "editor.js"
	addsgf 1.0 by admin@tecbbs.com
	2013-7-14
*/
function addsgf(cmd,title,l_submit,l_close,l_tips,l_help) {

	checkFocus();
	show_sgfview_Editor(cmd,title,l_submit,l_close,l_tips,l_help);
	return;
}
function show_sgfview_Editor(tag,title,l_submit,l_close,l_tips,l_help,params) {
		
	var sel, selection, modelid;
	var strdialog = 0;
	var ctrlid = editorid + (params ? '_cst' + params + '_' : '_') + tag;
	
	var opentag = '[' + tag + ']';
	var closetag = '[/' + tag + ']';
	var menu = $(ctrlid + '_menu');
	var pos = [0, 0];
	var menuwidth = 600;
	var menupos = '43!';
	var menutype = 'menu';

	if(BROWSER.ie) {
		sel = wysiwyg ? editdoc.selection.createRange() : document.selection.createRange();
		pos = getCaret();
	}
	selection = sel ? (wysiwyg ? sel.htmlText : sel.text) : getSel();
	menupos = '00';
	menutype = 'sgfexit';

	var menu = document.createElement('div');
	menu.id = ctrlid + '_menu';
	menu.style.display = 'none';
	menu.className = 'p_pof upf';
	menu.style.width = menuwidth + 'px';
	menu.className = 'fwinmask';
	
	s='<table width="100%" cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><div class="mtm">'
		+ '<ul class="tb tb_s cl" style="margin-top:0;margin-bottom:0;">'
			+'<li class="y"><span class="flbc" onclick="hideMenu(\'\', \'sgfexit\');return false;">'+l_close+'</span></li>'
			+'<li id="e_btn_www"><em>'+title+'</em></li></ul>'
					+'<div class="p_opt popupfix">'
					+'<table cellpadding="0" cellspacing="0" width="100%">'
					+'<tr height="5px"><th width="74%" class="pbn"></th></tr>'
					+ '<td><textarea id="sgfcode" style="width: 95%; height:200px;"  class="px" autocomplete="off"></textarea></td>'
					+ '</tr></table>'
				+ '</div>'
			+ '<div class="upfilelist upfl bbda"></div>'
				+ '<div class="notice upnf">'+l_tips+'<br />  '+l_help+'</div>'
			+ '<p class="o pns"><button type="submit" id="' + ctrlid + '_submit" class="pn pnc"><strong>'+l_submit+'</strong></button></p>'
		+ '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>'
		menu.innerHTML = s;
	$(editorid + '_editortoolbar').appendChild(menu);
	showMenu({'ctrlid':ctrlid,'mtype':menutype,'evt':'click','duration':3,'cache':0,'drag':1,'pos':menupos});

	try {
		if($(ctrlid + '_param_1')) {
			$(ctrlid + '_param_1').focus();
		}
	} catch(e) {}
	var objs = menu.getElementsByTagName('*');
	for(var i = 0; i < objs.length; i++) {
		_attachEvent(objs[i], 'keydown', function(e) {
			e = e ? e : event;
			obj = BROWSER.ie ? event.srcElement : e.target;
			if((obj.type == 'text' && e.keyCode == 13) || (obj.type == 'textarea' && e.ctrlKey && e.keyCode == 13)) {
				if($(ctrlid + '_submit') && tag != 'image') $(ctrlid + '_submit').click();
				doane(e);
			} else if(e.keyCode == 27) {
				hideMenu();
				doane(e);
			}
		});
	}
	if($(ctrlid + '_submit')) $(ctrlid + '_submit').onclick = function() {
		checkFocus();
		if(BROWSER.ie && wysiwyg) {
			setCaret(pos[0]);
		}
		var sgfcode = document.getElementById("sgfcode").value;//»ñµÃÆåÆ×
		if(trim(sgfcode)!=""){
			sgfcode=trim(sgfcode);
		}else {
			sgfcode="(;CA[gb2312]AP[MultiGo:4.4.4]SZ[13]C[SGF´íÎó]MULTIGOGM[1])";
		}
		
		var strimg3 = '[go]' + sgfcode + '[/go]';
			if(wysiwyg) {		
				insertText(strimg3, strimg3.length, 0, false, sel);
			}else {	
				insertText(strimg3, 0, 0, false, sel)
			};
		hideMenu('', 'sgfexit');
		hideMenu();
	};
}
