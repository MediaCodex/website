%{ for key,value in env ~}
${key}=${value}
%{ endfor ~}