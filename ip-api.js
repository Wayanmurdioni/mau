<script>
        // 首次加载页面时调用获取本地信息
        window.onload = getLocalIPInfo;

        function getLocalIPInfo() {
            const localApiURL = "https://qifu.baidu.com/ip/local/geo/v1/district";
            fetch(localApiURL)
                .then(response => response.json())
                .then(data => displayResult(data))
                .catch(error => handleRequestError(error));
        }

        function getIPInfo() {
            const ipInput = document.getElementById("ipInput").value;
            if (!ipInput) {
                alert("请输入IP地址");
                return;
            }

            let apiURL;
            if (isValidIPv4(ipInput)) {
                apiURL = `https://qifu.baidu.com/ip/geo/v1/district?ip=${ipInput}`;
            } else if (isValidIPv6(ipInput)) {
                apiURL = `https://qifu.baidu.com/ip/geo/v1/ipv6/district?ip=${ipInput}`;
            } else {
                alert("请输入有效的IPv4或IPv6地址");
                return;
            }

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    if (data.code === "InvalidParameter") {
                        handleInvalidParameter(data);
                    } else {
                        displayResult(data);
                    }
                })
                .catch(error => handleRequestError(error));
        }

        function displayResult(data) {
            const resultDiv = document.getElementById("result");
            const ipInput = document.getElementById("ipInput");
            ipInput.value = data.ip;
            resultDiv.innerHTML = `
                <p><strong>大洲:</strong> ${data.data.continent}</p>
                <p><strong>国家:</strong> ${data.data.country}</p>
                <p><strong>位置:</strong> ${data.data.prov} ${data.data.city} ${data.data.district}</p>
                <p><strong>精确度:</strong> ${data.data.accuracy}</p>
                <p><strong>数据来源:</strong> ${data.data.source}</p>
                <p><strong>IP地址:</strong> ${data.ip}</p>
                <p><strong>自治域:</strong> AS${data.data.asnumber}</p>
                <p><strong>所有者:</strong> ${data.data.owner}</p>
                <p><strong>运营商:</strong> ${data.data.isp}</p>
                <p><strong>区域代码:</strong> ${data.data.areacode}</p>
                <p><strong>城市编码:</strong> ${data.data.adcode}</p>
                <p><strong>邮编:</strong> ${data.data.zipcode}</p>
                <p><strong>经度:</strong> ${data.data.lng}</p>
                <p><strong>纬度:</strong> ${data.data.lat}</p>
                <p><strong>时区:</strong> ${data.data.timezone}</p>
                <p><strong>查询结果:</strong> ${data.msg}</p>
            `;
        }

        function handleInvalidParameter(response) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h2>参数错误</h2>
                <p><strong>错误消息:</strong> ${response.msg}</p>
            `;
        }

        function handleRequestError(error) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h2>请求错误</h2>
                <p><strong>错误消息:</strong> ${error.message}</p>
            `;
        }

        function isValidIPv4(ip) {
            const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
            return ipv4Regex.test(ip);
        }

        function isValidIPv6(ip) {
            const ipv6Regex = /^([0-9a-fA-F]{0,4}:){0,6}(:[0-9a-fA-F]{0,4}){1,6}$/;
            return ipv6Regex.test(ip);
        }
    </script>
