var Cadastrado = ({
    
    _idCont: 0,

    init: function(){
        $('#add-button').on('click', Cadastrado._addDisciplina);
        
        $('#add-input').keypress(function(e){
            if (e.which == 13){
                e.preventDefault();
                $('#add-button').trigger('click');
            };
        });
    },
    
    _addDisciplina: function (){
        var disciplina = $('#add-input').val();
        $('#add-input').val("");
        if (disciplina != ""){
            Cadastrado._idCont++;
            var liTemplate = $('.para-aprender-template li').clone();
            liTemplate.attr('data-id', Cadastrado._idCont);
            liTemplate.find('.disciplina').html(disciplina);
            liTemplate.find('.action-aprendi').on('click', Cadastrado._aprendi);
            liTemplate.find('.action-remover').on('click', Cadastrado._remover);
            liTemplate.fadeIn('slow');
            $('#para-aprender').append(liTemplate);
        }
    },
    
    _aprendi: function(e){
        var obj = event.target;
        var li = $(obj.parentElement.parentElement);
        var liClone = li.clone();
        liClone.find('.action-aprendi').hide();
        liClone.attr('data-status','aprendido');
        liClone.find('.action-remover').on('click', Cadastrado._remover);
        $('#aprendidos').append(liClone);
        li.addClass('list-group-item-success');
        li.find('.action-aprendi').removeClass('btn-success').unbind('click').addClass('btn-default');
        li.find('.action-remover').removeClass('btn-danger').unbind('click').addClass('btn-default');
    },
    
    _remover: function(e){
        var obj = event.target;
        var li = $(obj.parentElement.parentElement);
        if ($(li).data('status') == 'aprendido'){
            var result = $('#para-aprender').find("[data-id='" + $(li).data('id') + "']");
            result.removeClass('list-group-item-success');
            result.find('.action-aprendi').removeClass('btn-default').show().unbind('click').addClass('btn-success').on('click', Cadastrado._aprendi);
            result.find('.action-remover').removeClass('btn-default').unbind('click').addClass('btn-danger').on('click', Cadastrado._remover);
        }
        $(li).remove();
    }

});

$(document).ready(Cadastrado.init);