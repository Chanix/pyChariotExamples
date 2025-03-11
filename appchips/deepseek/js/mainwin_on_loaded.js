// 创建浮层
var modal = document.createElement('div');
modal.id = 'modal';
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.zIndex = '1';
modal.style.left = '0';
modal.style.top = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.overflow = 'auto';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

// 创建浮层内容
var modalContent = document.createElement('div');
modalContent.style.backgroundColor = '#fefefe';
modalContent.style.margin = '15% auto';
modalContent.style.padding = '20px';
modalContent.style.border = '1px solid #888';
modalContent.style.width = '50%';

// 创建关闭按钮
var closeButton = document.createElement('span');
closeButton.innerHTML = '&times;';
closeButton.style.color = '#aaa';
closeButton.style.float = 'right';
closeButton.style.fontSize = '28px';
closeButton.style.fontWeight = 'bold';
closeButton.style.cursor = 'pointer';

closeButton.onclick = function() {
    modal.style.display = 'none';
};

// 创建表格
var table = document.createElement('table');
table.style.width = '100%';
table.style.borderCollapse = 'collapse';

var thead = document.createElement('thead');
var tbody = document.createElement('tbody');

var headerRow = document.createElement('tr');
['', '', ''].forEach(function(headerText) {
    var th = document.createElement('th');
    th.textContent = headerText;
    th.style.border = '1px solid #ddd';
    th.style.padding = '8px';
    th.style.textAlign = 'left';
    th.style.backgroundColor = '#f2f2f2';
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);

var data = [
    ['Ctrl+Alt+B 切换左侧边栏', 'Ctrl+Alt+C 复制最后回答', 'Ctrl+Alt+H 切换使用帮助'],
    ['Ctrl+Alt+N 开启新的会话', 'Ctrl+Alt+D 切换“深度思考”', 'Ctrl+Alt+D 切换“联网搜索”']
];

data.forEach(function(rowData) {
    var row = document.createElement('tr');
    rowData.forEach(function(cellData) {
        var td = document.createElement('td');
        td.textContent = cellData;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'left';
        row.appendChild(td);
    });
    tbody.appendChild(row);
});

table.appendChild(thead);
table.appendChild(tbody);

// 将表格和关闭按钮添加到浮层内容中
modalContent.appendChild(closeButton);
modalContent.appendChild(table);

// 将浮层内容添加到浮层中
modal.appendChild(modalContent);

// 将浮层添加到页面中
document.body.appendChild(modal);




// 监听键盘事件，实现小应用快捷键。
document.addEventListener(
    'keydown',
    function(event) {
        const isCTRL = event.ctrlKey || event.metaKey;
        if (isCTRL && event.altKey && event.key.toLowerCase() === 'b') {
            event.preventDefault();
            handleCtrlAltB();
        } else if (isCTRL && event.altKey && event.key.toLowerCase() === 'c') {
            event.preventDefault();
            handleCtrlAltC();
        } else if (isCTRL && event.altKey && event.key.toLowerCase() === 'd') {
            event.preventDefault();
            handleCtrlAltD();
        } else if (isCTRL && event.altKey && event.key.toLowerCase() === 'h') {
            event.preventDefault();
            handleCtrlAltH();
        } else if (isCTRL && event.altKey && event.key.toLowerCase() === 'n') {
            event.preventDefault();
            handleCtrlAltN();
        } else if (isCTRL && event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            handleCtrlAltS();
        } else if (isCTRL && !event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            handleCtrlS();
        }
    }
);

function findSpanByText(text) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: (node) => node.textContent.trim() === text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
  );
  return treeWalker.nextNode()?.parentElement;
}

// 复制当前会话中的最后一个答案到剪贴板（md 格式）
function handleCtrlAltC() {
    // 先找到最后一个 class 为 ds-flex 的 div
    const dsFlexElements = document.querySelectorAll('div.ds-flex');
    const lastDsFlexDiv = dsFlexElements.length > 0 ? dsFlexElements[dsFlexElements.length - 1] : null;

    // 如果存在该元素，继续查找其内部第一个 ds-icon-button 元素
    if (lastDsFlexDiv) {
        const firstIconButton = lastDsFlexDiv.querySelector('.ds-icon-button'); // 返回第一个匹配的子元素
        if (firstIconButton) { firstIconButton.click(); }
    }
}

// 切换左侧边栏显示
function handleCtrlAltB() {
    document.getElementsByClassName('ds-icon')[0].click();
}

// 显示帮助
function handleCtrlAltH() {
    // 切换浮层的显示状态
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}

// 开启新会话
function handleCtrlAltN() {
    let span = findSpanByText('开启新对话');
    if (!span) {
        span = findSpanByText('New chat');
    }

    if (span) {
        const div = span.closest('div');
        if (div) {
            div.click();
        }
    }
}

function handleCtrlS() {
    console.log('Ctrl+S pressed');
}

// 切换“深度思考”
function handleCtrlAltD() {
    document.getElementsByClassName('ds-button__icon')[0].parentElement.click()
}

// 切换“深度思考”
function handleCtrlAltS() {
    document.getElementsByClassName('ds-button__icon')[1].parentElement.click()
}


