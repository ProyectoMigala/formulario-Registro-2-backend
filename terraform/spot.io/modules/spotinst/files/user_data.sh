#!/bin/bash

mensaje () {
    echo ""
    echo "************************************************************"
    echo "\t $1"
    echo "************************************************************"
    echo ""
}

mensaje "Cambiamos al usuario root"
sudo su -

mensaje "Creamos la carpeta opt"
mkdir /root/opt

mensaje "Nos Movemos de Carpeta"
cd /root/opt

mensaje "Clonamos el repositorio"
git clone https://github.com/ProyectoMigala/formulario-Registro-2-backend.git

mensaje "Finalizamos"
