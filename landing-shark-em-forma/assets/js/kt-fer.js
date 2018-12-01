$(document).ready(function() 
{
    
    $('.navbar-brand .logo-2').toggleClass('d-none');
    $('.navbar-nav').toggleClass('align-items-end');
    
    $(window).scroll(function()
    {  
    	$('.navbar').toggleClass('scrolled', $(this).scrollTop() > 10);
    	$('.navbar-brand .logo-1').toggleClass('d-none', $(this).scrollTop() > 10);
	    $('.navbar-brand .logo-2').toggleClass('d-block', $(this).scrollTop() > 10);
    	$('.navbar-brand').toggleClass('navbar-brand-change', $(this).scrollTop() > 10);
    	$('.navbar-nav').toggleClass('align-items-center', $(this).scrollTop() > 10);

    });
    
    $('.galeria').owlCarousel({
        nav:true,
        items:1,
        navText : ["<i class='fa fa-chevron-circle-left' aria-hidden='true'></i>","<i class='fa fa-chevron-circle-right' aria-hidden='true'></i>"]
    });
    
//    $(".btn-via").on('click', function(e){
//        
//        $(".btn-via").removeClass('active');
//        $(this).parent().addClass('active'); 
//        
//    });
    
    $(".btn-via").click(function(e){
        
        $(".btn-via").removeClass('active');
        $(this).addClass('active');
        
        e.preventDefault();

    });
    
         
});

$(document).ready(function() 
{
    
    $('#add_row').on('click', function() 
    {   
        // Dynamic Rows Code
        
        // Get max row id and set new id
        var newid = 0;
        
        $.each($('#tab_logic .multiple-fields'), function() {
           
            if (parseInt($(this).data('id')) >= newid) {
                
                newid = parseInt($(this).data('id'));
            
            }
            

            
        });
        
        newid ++;
        console.log(newid);

        var tr = $('<div></div>', {
            id: 'addr'+newid,
            class: 'row multiple-fields addr'+newid,
            "data-id": newid
        });
        
        // loop through each td and create new elements with name of newid
        $.each($('#tab_logic .multiple-fields:nth(0) .field'), function() {
           
            var cur_td = $(this);
            
            var children = cur_td.children();
            
            // add new td and element if it has a name
            if ($(this).data('name') != undefined) {
                
                var td = $('<span></span>', {
                    "data-name": $(cur_td).data('name'),
                    class: 'col-12 col-md-3 pt-1 pt-md-3 field'
                });
                
                var c = $(cur_td).find($(children[0]).prop('tagName')).clone().val('');
                c.attr('name', $(cur_td).data('name') + newid);
                
                c.appendTo($(td));
                td.appendTo($(tr));
                
            } else {
                
                var td = $('<span></span>', {
                    'text': $('#tab_logic .fields').length
                }).appendTo($(tr));
                
            }
        });
                
        // add the new row
        $(tr).appendTo($('#tab_logic'));
        
        $(tr).find('a.row-remove').on('click', function() {
             $('.addr'+newid).closest('div').remove();
        });
});




    // Sortable Code
    var fixHelperModified = function(e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();
    
        $helper.children().each(function(index) {
            $(this).width($originals.eq(index).width())
        });
        
        return $helper;
    };
  
//    $(".multiple-fields").sortable({
//        helper: fixHelperModified      
//    }).disableSelection();
//
////    $(".table-sortable thead").disableSelection();
//
//    $("#add_row").trigger("click");
});


/* ####################################################### */

var id_linha = 0;

function add_linha_de_campos(){

    var container_linhas = $('#tab_logic');

    var html =  '<div id="addr_' + id_linha + '" data-id="' + id_linha + '" class="row align-items-end">';
    html += '<div class="col-12 col-md-3 pt-1 pt-md-2">';
    html += '<label for="Produto" class="' + ( id_linha == 0 ? 'd-block d-md-block' : 'd-block d-md-none' ) + '">Produto/Descrição</label>';
    html += '<span class="field" data-name="produto">';
    html += '<input type="text" id="produto_' + id_linha + '" name="produto[]" class="form-control"/>';
    html += '</span>';
    html += '</div>';
    html += '<div class="col-12 col-md-3 pt-1 pt-md-2">';
    html += '<label for="Peso" class="' + ( id_linha == 0 ? 'd-block d-md-block' : 'd-block d-md-none' ) + '">Qtde/Peso</label>';
    html += '<span class="field" data-name="peso">';
    html += '<input type="text" id="peso_' + id_linha + '" name="peso[]" class="form-control"/>';
    html += '</span>';
    html += '</div>';
    html += '<div class="col-12 col-md-3 pt-1 pt-md-2">';
    html += '<label for="Barras" class="' + ( id_linha == 0 ? 'd-block d-md-block' : 'd-block d-md-none' ) + '">Barras</label>';
    html += '<span class="field" data-name="barras">';
    html += '<input type="text" id="barras_' + id_linha + '" name="barras[]" class="form-control"/>';
    html += '</span>';
    html += '</div>';
    html += '<div class="col-12 col-md-3 pt-1 pt-md-2">';
    html += '<label for="Remove">&nbsp;</label>';
    html += '<span class="field" data-name="del">';
    html += '<a href="javascript:;" onclick="remove_linha_de_campos(\'' + id_linha + '\');" class="btn btn-remove">';
    html += '<i class="fa fa-minus" aria-hidden="true"></i>';
    html += '</a>';
    html += '</span>';
    html += '</div>';
    html += '</div>';

    container_linhas.append( html );
    id_linha++;

}

function remove_linha_de_campos( linha ){
    if( linha == 0 ){
        //faz nada
    } else {
        $('#addr_' + linha).fadeOut().remove();
    }
}

$(document).ready(function(){
    add_linha_de_campos();
});

