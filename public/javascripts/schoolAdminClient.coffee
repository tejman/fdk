$ ->
  ###
  ***************** Function Definitions **************
  ###
  showCurrentInfo = (userSchool)->
    $inputLabels = $(".control-label")
    for label in $inputLabels
      name = $(label).attr("for")
      if userSchool[name] && userSchool[name].length
        $("#"+name).val(userSchool[name])


  ###
  ***************** Main Code **************
  ###
  console.log bootData
  if bootData.userSchool then showCurrentInfo bootData.userSchool


  ###
  ***************** Click Handlers **************
  ###



