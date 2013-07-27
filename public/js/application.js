function resetForm(){
  $('#text').val('');
  $('#type').val('');
  $('#new-question').hide();
  $('#add-question').show();
  $('#create').hide();
  $('#add-option').hide();
  $('#options p').remove();
}


$(document).ready(function(){
  $('#new-question').hide();
  $('#create').hide();
  $('#add-option').hide();
  $('#options').hide();
  $('#responses').hide();

  $('#add').click(function(event){
    event.preventDefault();
    event.stopPropagation();
    $('#add-question').hide();
    $('#new-question').show();
    $('#type').change(function(event){
      event.stopPropagation();
      var type = $(this).val();
      if (type == 'TextArea' || type == 'NumSlider' || type == 'PercentSlider' || type == 'ShortResponse') {
        $('#add-option').hide();
        $('#options p').remove();
        $('#options').hide();
        $('#responses').hide();
        $('#create').show();
      }
      if (type == 'McRadio' || type == 'McCheck') {
        $('#create').show();
        $('#add-option').show();
        $('#options').show();
        $('#responses').hide();
        $('#add-option').click(function(event){
          event.stopPropagation();
          $('#options').append($('<p id="option"><input type="text" name="response" placeholder="Option"><button id="remove">Remove</button></p>'));
        });
        $('#options').on('click', '#remove', function(event){
          event.stopPropagation();
          $(this).parent().remove();
        });
      }
      // if (type == 'ShortResponse'){
      //   $("#create").show();
      //   $("#add-option").hide();
      //   $('#options').hide();
      //   $('#responses').show();
      // }
    });
    $('#create').click(function(event){
      event.stopPropagation();
      var url = $('#define').attr('action');
      var responses = [];
      $('#options p input[name="response"]').each(function(){
        responses.push($(this).val());
      });
      var data = {question: {}};
      data['question']['type'] = $('#type').val();
      data['question']['text'] = $('#text').val();
      data['responses'] = responses;
      $.post(url, data, function(response){
        $('#questions').append(response);
      });
      resetForm();
    });
  });
});
